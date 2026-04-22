import {
	DANH_SACH_CHUC_VU,
	DANH_SACH_PHONG_BAN,
	TRANG_THAI_LABEL,
	type INhanVien,
} from '@/services/NhanVien';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const { Option } = Select;

const FormNhanVien = () => {
	const { record, isEdit, themNhanVien, suaNhanVien, setVisibleForm } = useModel('nhanvien');
	const [form] = Form.useForm();

	useEffect(() => {
		if (isEdit && record) {
			form.setFieldsValue(record);
		} else {
			form.resetFields();
		}
	}, [record, isEdit, form]);

	const onFinish = (values: any) => {
		if (isEdit && record) {
			suaNhanVien({ ...values, maNhanVien: record.maNhanVien });
		} else {
			themNhanVien(values);
		}
	};

	const validateHoTen = (_: any, value: string) => {
		if (!value) return Promise.reject(new Error('Vui lòng nhập họ tên!'));
		if (value.length > 50) return Promise.reject(new Error('Họ tên tối đa 50 ký tự!'));
		const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
		if (specialChars.test(value))
			return Promise.reject(new Error('Họ tên không được chứa ký tự đặc biệt hoặc số!'));
		return Promise.resolve();
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish}>
			{isEdit && record && (
				<Form.Item label='Mã nhân viên'>
					<Input value={record.maNhanVien} disabled />
				</Form.Item>
			)}

			<Row gutter={16}>
				<Col span={24}>
					<Form.Item label='Họ tên' name='hoTen' rules={[{ validator: validateHoTen }]}>
						<Input placeholder='Nhập họ tên nhân viên' maxLength={50} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label='Chức vụ'
						name='chucVu'
						rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
					>
						<Select placeholder='Chọn chức vụ'>
							{DANH_SACH_CHUC_VU.map((cv) => (
								<Option key={cv} value={cv}>
									{cv}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label='Phòng ban'
						name='phongBan'
						rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
					>
						<Select placeholder='Chọn phòng ban'>
							{DANH_SACH_PHONG_BAN.map((pb) => (
								<Option key={pb} value={pb}>
									{pb}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label='Lương (VNĐ)'
						name='luong'
						rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
					>
						<InputNumber
							style={{ width: '100%' }}
							min={0}
							placeholder='Nhập mức lương'
							formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={(value) => value!.replace(/,/g, '') as any}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label='Trạng thái'
						name='trangThai'
						rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
					>
						<Select placeholder='Chọn trạng thái'>
							{Object.entries(TRANG_THAI_LABEL).map(([key, label]) => (
								<Option key={key} value={key}>
									{label}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
				<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
				<Button type='primary' htmlType='submit'>
					{isEdit ? 'Cập nhật' : 'Thêm mới'}
				</Button>
			</div>
		</Form>
	);
};

export default FormNhanVien;
