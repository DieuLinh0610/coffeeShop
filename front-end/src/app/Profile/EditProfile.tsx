import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { setUser } from '@/src/redux/authSlice';
import Toast from 'react-native-toast-message';
import { updateUserAPI } from '@/src/apis/axios';
import { Calendar } from 'react-native-calendars';
export default function EditProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.user);

  const [name, setName] = useState(currentUser?.userName || '');
  const [phone, setPhone] = useState(currentUser?.phoneNumber || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [dateOfBirth, setDateOfBirth] = useState<string>(currentUser?.dateOfBirth || '');
  const [gender, setGender] = useState(currentUser?.gender ? 'male' : 'female');
  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSave = async () => {
    try {
      const updatedData = { name, phone, location, dateOfBirth, gender: gender === 'male' };
      console.log("🟢 Dữ liệu gửi lên API:", updatedData); 
      const response = await updateUserAPI(currentUser.id, updatedData);
      console.log("🟢 Phản hồi từ API:", response);
      if (response.status === 200) {
        dispatch(setUser({ ...currentUser, ...updatedData }));
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Thông tin đã được cập nhật!',
        });
        router.back();
      }
    } catch (error) {
      console.error("🔴 Lỗi API:", error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Không thể cập nhật thông tin. Hãy thử lại sau.',
      });
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Họ và Tên:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Số điện thoại:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Địa chỉ:</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

       <Text style={styles.label}>Ngày sinh:</Text>

      {/* Nút bấm để mở lịch */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendar(!showCalendar)}>
      <Text style={styles.dateText}>
  {dateOfBirth ? dateOfBirth.toString().split('T')[0] : 'Chọn ngày sinh'}
</Text>

      </TouchableOpacity>

      {/* Hiển thị lịch khi bấm vào nút */}
      {showCalendar && (
        <Calendar
        onDayPress={(day) => {
          setDateOfBirth(day.dateString); // Đã là string nên không lỗi
          setShowCalendar(false);
        }}
          markedDates={{
            [dateOfBirth]: { selected: true, marked: true, selectedColor: '#6F4F1F' },
          }}
        />
      )}

      <Text style={styles.label}>Giới tính:</Text>
      <View style={styles.genderContainer}>
      <TouchableOpacity
    style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
    onPress={() => setGender('male')}
  >
    <Text style={[styles.genderText, gender === 'male' && styles.selectedText]}>Nam</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
    onPress={() => setGender('female')}
  >
    <Text style={[styles.genderText, gender === 'female' && styles.selectedText]}>Nữ</Text>
  </TouchableOpacity>
      </View>

      <Button title="Lưu" onPress={handleSave} color="#6F4F1F" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  
  dateButton: {
    backgroundColor: '#6F4F1F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 100
  },
  selectedGender: {
    backgroundColor: '#6F4F1F',
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#6F4F1F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',  // Đảm bảo nút full chiều rộng
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

