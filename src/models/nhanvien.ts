import {
	type INhanVien,
	addNhanVien,
	deleteNhanVien,
	getData,
	updateNhanVien,
} from '@/services/NhanVien';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState<INhanVien[]>([]);
	const [visibleForm, setVisibleForm] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [record, setRecord] = useState<INhanVien | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const getDataNhanVien = () => {
		setLoading(true);
		try {
			const result = getData();
			setData([...result]);
		} finally {
			setLoading(false);
		}
	};

	const themNhanVien = (values: Omit<INhanVien, 'maNhanVien'>): boolean => {
		try {
			addNhanVien(values);
			message.success('Thêm nhân viên thành công!');
			getDataNhanVien();
			setVisibleForm(false);
			return true;
		} catch {
			message.error('Thêm nhân viên thất bại!');
			return false;
		}
	};

	const suaNhanVien = (values: INhanVien): boolean => {
		try {
			updateNhanVien(values);
			message.success('Cập nhật nhân viên thành công!');
			getDataNhanVien();
			setVisibleForm(false);
			return true;
		} catch {
			message.error('Cập nhật nhân viên thất bại!');
			return false;
		}
	};

	const xoaNhanVien = (maNhanVien: string): boolean => {
		const result = deleteNhanVien(maNhanVien);
		if (result) {
			message.success('Xóa nhân viên thành công!');
			getDataNhanVien();
			return true;
		} else {
			message.error('Không thể xóa nhân viên có trạng thái này!');
			return false;
		}
	};

	return {
		data,
		loading,
		visibleForm,
		setVisibleForm,
		isEdit,
		setIsEdit,
		record,
		setRecord,
		getDataNhanVien,
		themNhanVien,
		suaNhanVien,
		xoaNhanVien,
	};
};
