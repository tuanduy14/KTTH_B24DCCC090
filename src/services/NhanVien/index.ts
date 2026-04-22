export enum ETrangThai {
	THU_VIEC = 'THU_VIEC',
	DA_KY_HOP_DONG = 'DA_KY_HOP_DONG',
	NGHI_PHEP = 'NGHI_PHEP',
	DA_THOI_VIEC = 'DA_THOI_VIEC',
}

export interface INhanVien {
	maNhanVien: string;
	hoTen: string;
	chucVu: string;
	phongBan: string;
	luong: number;
	trangThai: ETrangThai;
}

const STORAGE_KEY = 'nhan_vien_data';

const INITIAL_DATA: INhanVien[] = [
	{
		maNhanVien: 'NV001',
		hoTen: 'Nguyễn Văn An',
		chucVu: 'Giám đốc',
		phongBan: 'Ban Giám đốc',
		luong: 50000000,
		trangThai: ETrangThai.DA_KY_HOP_DONG,
	},
	{
		maNhanVien: 'NV002',
		hoTen: 'Trần Thị Bình',
		chucVu: 'Trưởng phòng',
		phongBan: 'Phòng Nhân sự',
		luong: 35000000,
		trangThai: ETrangThai.DA_KY_HOP_DONG,
	},
	{
		maNhanVien: 'NV003',
		hoTen: 'Lê Minh Cường',
		chucVu: 'Nhân viên',
		phongBan: 'Phòng Kỹ thuật',
		luong: 20000000,
		trangThai: ETrangThai.THU_VIEC,
	},
	{
		maNhanVien: 'NV004',
		hoTen: 'Phạm Thị Dung',
		chucVu: 'Chuyên viên',
		phongBan: 'Phòng Kế toán',
		luong: 25000000,
		trangThai: ETrangThai.NGHI_PHEP,
	},
	{
		maNhanVien: 'NV005',
		hoTen: 'Hoàng Văn Em',
		chucVu: 'Nhân viên',
		phongBan: 'Phòng Kinh doanh',
		luong: 18000000,
		trangThai: ETrangThai.DA_THOI_VIEC,
	},
	{
		maNhanVien: 'NV006',
		hoTen: 'Vũ Thị Phương',
		chucVu: 'Phó phòng',
		phongBan: 'Phòng Marketing',
		luong: 30000000,
		trangThai: ETrangThai.DA_KY_HOP_DONG,
	},
];

export const getData = (): INhanVien[] => {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
		return INITIAL_DATA;
	}
	return JSON.parse(raw);
};

export const saveData = (data: INhanVien[]): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const generateMaNhanVien = (): string => {
	const data = getData();
	const maxId = data.reduce((max, item) => {
		const num = parseInt(item.maNhanVien.replace('NV', ''), 10);
		return num > max ? num : max;
	}, 0);
	const next = maxId + 1;
	return `NV${String(next).padStart(3, '0')}`;
};

export const addNhanVien = (record: Omit<INhanVien, 'maNhanVien'>): INhanVien => {
	const data = getData();
	const maNhanVien = generateMaNhanVien();
	const newRecord: INhanVien = { ...record, maNhanVien };
	saveData([newRecord, ...data]);
	return newRecord;
};

export const updateNhanVien = (record: INhanVien): void => {
	const data = getData();
	const idx = data.findIndex((d) => d.maNhanVien === record.maNhanVien);
	if (idx !== -1) {
		data[idx] = record;
		saveData(data);
	}
};

export const deleteNhanVien = (maNhanVien: string): boolean => {
	const data = getData();
	const item = data.find((d) => d.maNhanVien === maNhanVien);
	if (!item) return false;
	if (item.trangThai !== ETrangThai.THU_VIEC && item.trangThai !== ETrangThai.DA_THOI_VIEC) {
		return false;
	}
	const newData = data.filter((d) => d.maNhanVien !== maNhanVien);
	saveData(newData);
	return true;
};

export const DANH_SACH_CHUC_VU = [
	'Giám đốc',
	'Phó Giám đốc',
	'Trưởng phòng',
	'Phó phòng',
	'Chuyên viên',
	'Nhân viên',
	'Thực tập sinh',
];

export const DANH_SACH_PHONG_BAN = [
	'Ban Giám đốc',
	'Phòng Nhân sự',
	'Phòng Kỹ thuật',
	'Phòng Kế toán',
	'Phòng Kinh doanh',
	'Phòng Marketing',
	'Phòng Hành chính',
	'Phòng IT',
];

export const TRANG_THAI_LABEL: Record<ETrangThai, string> = {
	[ETrangThai.THU_VIEC]: 'Thử việc',
	[ETrangThai.DA_KY_HOP_DONG]: 'Đã ký hợp đồng',
	[ETrangThai.NGHI_PHEP]: 'Nghỉ phép',
	[ETrangThai.DA_THOI_VIEC]: 'Đã thôi việc',
};

export const TRANG_THAI_COLOR: Record<ETrangThai, string> = {
	[ETrangThai.THU_VIEC]: 'orange',
	[ETrangThai.DA_KY_HOP_DONG]: 'green',
	[ETrangThai.NGHI_PHEP]: 'blue',
	[ETrangThai.DA_THOI_VIEC]: 'red',
};
