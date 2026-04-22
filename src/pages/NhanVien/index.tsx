import {
	DANH_SACH_CHUC_VU,
	DANH_SACH_PHONG_BAN,
	ETrangThai,
	TRANG_THAI_COLOR,
	TRANG_THAI_LABEL,
	type INhanVien,
} from '@/services/NhanVien';
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import {
	Badge,
	Button,
	Card,
	Col,
	Input,
	Modal,
	Popconfirm,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Tooltip,
	Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import FormNhanVien from './Form';

const { Title } = Typography;
const { Option } = Select;

const NhanVienPage = () => {
	const {
		data,
		loading,
		visibleForm,
		setVisibleForm,
		isEdit,
		setIsEdit,
		setRecord,
		getDataNhanVien,
		xoaNhanVien,
	} = useModel('nhanvien');

	const [searchText, setSearchText] = useState('');
	const [filterChucVu, setFilterChucVu] = useState<string | undefined>();
	const [filterPhongBan, setFilterPhongBan] = useState<string | undefined>();

	useEffect(() => {
		getDataNhanVien();
	}, []);

	const filteredData = useMemo(() => {
		let result = [...data];

		if (searchText.trim()) {
			const keyword = searchText.trim().toLowerCase();
			result = result.filter(
				(item) =>
					item.maNhanVien.toLowerCase().includes(keyword) ||
					item.hoTen.toLowerCase().includes(keyword),
			);
		}

		if (filterChucVu) {
			result = result.filter((item) => item.chucVu === filterChucVu);
		}

		if (filterPhongBan) {
			result = result.filter((item) => item.phongBan === filterPhongBan);
		}

		// Sắp xếp lương giảm dần
		result.sort((a, b) => b.luong - a.luong);

		return result;
	}, [data, searchText, filterChucVu, filterPhongBan]);

	const canDelete = (record: INhanVien) =>
		record.trangThai === ETrangThai.THU_VIEC || record.trangThai === ETrangThai.DA_THOI_VIEC;

	const columns = [
		{
			title: 'Mã NV',
			dataIndex: 'maNhanVien',
			key: 'maNhanVien',
			width: 90,
			render: (val: string) => <strong>{val}</strong>,
		},
		{
			title: 'Họ tên',
			dataIndex: 'hoTen',
			key: 'hoTen',
			width: 180,
		},
		{
			title: 'Chức vụ',
			dataIndex: 'chucVu',
			key: 'chucVu',
			width: 140,
		},
		{
			title: 'Phòng ban',
			dataIndex: 'phongBan',
			key: 'phongBan',
			width: 170,
		},
		{
			title: 'Lương (VNĐ)',
			dataIndex: 'luong',
			key: 'luong',
			width: 150,
			align: 'right' as const,
			render: (val: number) => (
				<span style={{ fontWeight: 600, color: '#1677ff' }}>
					{val.toLocaleString('vi-VN')}
				</span>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
			width: 160,
			render: (val: ETrangThai) => (
				<Tag color={TRANG_THAI_COLOR[val]}>{TRANG_THAI_LABEL[val]}</Tag>
			),
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 120,
			align: 'center' as const,
			render: (_: any, rec: INhanVien) => (
				<Space>
					<Tooltip title='Chỉnh sửa'>
						<Button
							type='primary'
							size='small'
							icon={<EditOutlined />}
							onClick={() => {
								setRecord(rec);
								setIsEdit(true);
								setVisibleForm(true);
							}}
						/>
					</Tooltip>
					<Tooltip
						title={
							canDelete(rec)
								? 'Xóa nhân viên'
								: 'Chỉ xóa được nhân viên Thử việc hoặc Đã thôi việc'
						}
					>
						<Popconfirm
							title='Xác nhận xóa'
							description={`Bạn có chắc muốn xóa nhân viên "${rec.hoTen}"?`}
							onConfirm={() => xoaNhanVien(rec.maNhanVien)}
							okText='Xóa'
							cancelText='Hủy'
							okButtonProps={{ danger: true }}
							disabled={!canDelete(rec)}
						>
							<Button
								danger
								size='small'
								icon={<DeleteOutlined />}
								disabled={!canDelete(rec)}
							/>
						</Popconfirm>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 24 }}>
			<Card
				title={
					<Space>
						<Title level={4} style={{ margin: 0 }}>
							Quản lý nhân viên
						</Title>
						<Badge count={filteredData.length} showZero color='#1677ff' />
					</Space>
				}
				extra={
					<Button
						type='primary'
						icon={<PlusOutlined />}
						onClick={() => {
							setRecord(undefined);
							setIsEdit(false);
							setVisibleForm(true);
						}}
					>
						Thêm nhân viên
					</Button>
				}
			>
				<Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={8}>
						<Input
							placeholder='Tìm theo mã hoặc họ tên...'
							prefix={<SearchOutlined />}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							allowClear
						/>
					</Col>
					<Col xs={12} sm={8}>
						<Select
							placeholder='Lọc theo chức vụ'
							style={{ width: '100%' }}
							value={filterChucVu}
							onChange={setFilterChucVu}
							allowClear
						>
							{DANH_SACH_CHUC_VU.map((cv) => (
								<Option key={cv} value={cv}>
									{cv}
								</Option>
							))}
						</Select>
					</Col>
					<Col xs={12} sm={8}>
						<Select
							placeholder='Lọc theo phòng ban'
							style={{ width: '100%' }}
							value={filterPhongBan}
							onChange={setFilterPhongBan}
							allowClear
						>
							{DANH_SACH_PHONG_BAN.map((pb) => (
								<Option key={pb} value={pb}>
									{pb}
								</Option>
							))}
						</Select>
					</Col>
				</Row>

				<Table
					loading={loading}
					dataSource={filteredData}
					columns={columns}
					rowKey='maNhanVien'
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showTotal: (total) => `Tổng: ${total} nhân viên`,
					}}
					scroll={{ x: 900 }}
					size='middle'
					bordered
				/>
			</Card>

			<Modal
				open={visibleForm}
				title={isEdit ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
				onCancel={() => setVisibleForm(false)}
				footer={null}
				destroyOnClose
				width={640}
			>
				<FormNhanVien />
			</Modal>
		</div>
	);
};

export default NhanVienPage;
