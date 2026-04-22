declare namespace NhanVien {
	export enum ETrangThai {
		THU_VIEC = 'THU_VIEC',
		DA_KY_HOP_DONG = 'DA_KY_HOP_DONG',
		NGHI_PHEP = 'NGHI_PHEP',
		DA_THOI_VIEC = 'DA_THOI_VIEC',
	}

	export interface Record {
		maNhanVien: string;
		hoTen: string;
		chucVu: string;
		phongBan: string;
		luong: number;
		trangThai: ETrangThai;
	}
}
