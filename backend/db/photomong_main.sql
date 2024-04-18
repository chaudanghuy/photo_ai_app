-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 18, 2024 lúc 08:29 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `photomong_main`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account_account`
--

CREATE TABLE `account_account` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` longtext NOT NULL,
  `phone` longtext NOT NULL,
  `address` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add store', 7, 'add_store'),
(26, 'Can change store', 7, 'change_store'),
(27, 'Can delete store', 7, 'delete_store'),
(28, 'Can view store', 7, 'view_store'),
(29, 'Can add device', 8, 'add_device'),
(30, 'Can change device', 8, 'change_device'),
(31, 'Can delete device', 8, 'delete_device'),
(32, 'Can view device', 8, 'view_device'),
(33, 'Can add frame', 9, 'add_frame'),
(34, 'Can change frame', 9, 'change_frame'),
(35, 'Can delete frame', 9, 'delete_frame'),
(36, 'Can view frame', 9, 'view_frame'),
(37, 'Can add layout', 10, 'add_layout'),
(38, 'Can change layout', 10, 'change_layout'),
(39, 'Can delete layout', 10, 'delete_layout'),
(40, 'Can view layout', 10, 'view_layout'),
(41, 'Can add background', 11, 'add_background'),
(42, 'Can change background', 11, 'change_background'),
(43, 'Can delete background', 11, 'delete_background'),
(44, 'Can view background', 11, 'view_background'),
(45, 'Can add filter', 12, 'add_filter'),
(46, 'Can change filter', 12, 'change_filter'),
(47, 'Can delete filter', 12, 'delete_filter'),
(48, 'Can view filter', 12, 'view_filter'),
(49, 'Can add payment', 13, 'add_payment'),
(50, 'Can change payment', 13, 'change_payment'),
(51, 'Can delete payment', 13, 'delete_payment'),
(52, 'Can view payment', 13, 'view_payment'),
(53, 'Can add order', 14, 'add_order'),
(54, 'Can change order', 14, 'change_order'),
(55, 'Can delete order', 14, 'delete_order'),
(56, 'Can view order', 14, 'view_order'),
(57, 'Can add transaction', 15, 'add_transaction'),
(58, 'Can change transaction', 15, 'change_transaction'),
(59, 'Can delete transaction', 15, 'delete_transaction'),
(60, 'Can view transaction', 15, 'view_transaction'),
(61, 'Can add sticker', 16, 'add_sticker'),
(62, 'Can change sticker', 16, 'change_sticker'),
(63, 'Can delete sticker', 16, 'delete_sticker'),
(64, 'Can view sticker', 16, 'view_sticker'),
(65, 'Can add account', 17, 'add_account'),
(66, 'Can change account', 17, 'change_account'),
(67, 'Can delete account', 17, 'delete_account'),
(68, 'Can view account', 17, 'view_account'),
(69, 'Can add cloud photo', 18, 'add_cloudphoto'),
(70, 'Can change cloud photo', 18, 'change_cloudphoto'),
(71, 'Can delete cloud photo', 18, 'delete_cloudphoto'),
(72, 'Can view cloud photo', 18, 'view_cloudphoto'),
(73, 'Can add redeem', 19, 'add_redeem'),
(74, 'Can change redeem', 19, 'change_redeem'),
(75, 'Can delete redeem', 19, 'delete_redeem'),
(76, 'Can view redeem', 19, 'view_redeem');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$Mk48AcyKIGkcNoZBHl8be8$f4U+WeuG+24zZ3ZeIEtcCpdLXmXIyxDqyRcfHkyGGYg=', '2024-04-14 03:58:35.904135', 1, 'photomong', '', '', 'admin@photomong.net', 1, 1, '2024-03-30 03:40:30.815595');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `background_background`
--

CREATE TABLE `background_background` (
  `id` bigint(20) NOT NULL,
  `title` longtext NOT NULL,
  `photo` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `photo_hover` varchar(100) NOT NULL,
  `position` longtext NOT NULL,
  `photo_kr` varchar(100) NOT NULL,
  `photo_kr_hover` varchar(100) NOT NULL,
  `photo_vn` varchar(100) NOT NULL,
  `photo_vn_hover` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `background_background`
--

INSERT INTO `background_background` (`id`, `title`, `photo`, `created_at`, `updated_at`, `photo_hover`, `position`, `photo_kr`, `photo_kr_hover`, `photo_vn`, `photo_vn_hover`) VALUES
(1, 'Seasons', 'backgrounds/seasons.png', '2024-03-30 06:48:26.051129', '2024-04-15 12:43:41.104774', 'backgrounds/seasons_click.png', 'row-1-1', 'backgrounds/season-default_ucf1qXQ.png', 'backgrounds/season-pressed_V7W7zcn.png', 'backgrounds/season-default.png', 'backgrounds/season-pressed.png'),
(2, 'Party', 'backgrounds/party.png', '2024-03-30 06:48:55.339055', '2024-04-15 12:47:11.990369', 'backgrounds/party_click.png', 'row-1-2', 'backgrounds/party-default_rWPbxwq.png', 'backgrounds/party-pressed_2vFMtdp.png', 'backgrounds/party-default.png', 'backgrounds/party-pressed.png'),
(3, 'Cartoon', 'backgrounds/cartoon.png', '2024-03-30 06:49:42.906969', '2024-04-15 12:48:07.227281', 'backgrounds/cartoon_click.png', 'row-1-3', 'backgrounds/cartoon-default_cQTeqaL.png', 'backgrounds/cartoon-pressed_uyyiRFJ.png', 'backgrounds/cartoon-default.png', 'backgrounds/cartoon-pressed.png'),
(4, 'Minimalism', 'backgrounds/minimalism.png', '2024-03-30 06:50:08.127495', '2024-04-15 12:49:02.125159', 'backgrounds/minimalism_click.png', 'row-1-4', 'backgrounds/minimalism-default_NGncVBt.png', 'backgrounds/minimalism-pressed_kaPlGsy.png', 'backgrounds/minimalism-default.png', 'backgrounds/minimalism-pressed.png'),
(5, 'Collab', 'backgrounds/collab.png', '2024-03-30 06:50:29.450924', '2024-04-15 12:50:00.152349', 'backgrounds/collab_click.png', 'row-1-5', 'backgrounds/collab-default_ifkU9MD.png', 'backgrounds/collab-pressed_g3sIycL.png', 'backgrounds/collab-default.png', 'backgrounds/collab-pressed.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `device_device`
--

CREATE TABLE `device_device` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` longtext NOT NULL,
  `photo_shooting_time` longtext NOT NULL,
  `photo_suffer_time` longtext NOT NULL,
  `photo_work_time` longtext NOT NULL,
  `product_price` longtext NOT NULL,
  `contact_number` longtext NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `store_id_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `device_device`
--

INSERT INTO `device_device` (`id`, `name`, `code`, `photo_shooting_time`, `photo_suffer_time`, `photo_work_time`, `product_price`, `contact_number`, `status`, `created_at`, `updated_at`, `store_id_id`, `user_id`) VALUES
(1, 'DEVICE 1', 'D1', '', '', '08:00', '', '123456789', 'Online', '2024-03-30 03:43:05.043595', '2024-03-30 03:43:05.043595', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(17, 'account', 'account'),
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(11, 'background', 'background'),
(5, 'contenttypes', 'contenttype'),
(8, 'device', 'device'),
(12, 'filter', 'filter'),
(18, 'frame', 'cloudphoto'),
(9, 'frame', 'frame'),
(10, 'layout', 'layout'),
(13, 'payment', 'payment'),
(19, 'redeem', 'redeem'),
(14, 'revenue', 'order'),
(15, 'revenue', 'transaction'),
(6, 'sessions', 'session'),
(16, 'sticker', 'sticker'),
(7, 'store', 'store');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'account', '0001_initial', '2024-03-30 03:37:04.693901'),
(2, 'contenttypes', '0001_initial', '2024-03-30 03:37:04.704280'),
(3, 'auth', '0001_initial', '2024-03-30 03:37:04.723394'),
(4, 'admin', '0001_initial', '2024-03-30 03:37:04.739191'),
(5, 'admin', '0002_logentry_remove_auto_add', '2024-03-30 03:37:04.754765'),
(6, 'admin', '0003_logentry_add_action_flag_choices', '2024-03-30 03:37:04.764790'),
(7, 'contenttypes', '0002_remove_content_type_name', '2024-03-30 03:37:04.786263'),
(8, 'auth', '0002_alter_permission_name_max_length', '2024-03-30 03:37:04.800714'),
(9, 'auth', '0003_alter_user_email_max_length', '2024-03-30 03:37:04.815974'),
(10, 'auth', '0004_alter_user_username_opts', '2024-03-30 03:37:04.826571'),
(11, 'auth', '0005_alter_user_last_login_null', '2024-03-30 03:37:04.839928'),
(12, 'auth', '0006_require_contenttypes_0002', '2024-03-30 03:37:04.845794'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2024-03-30 03:37:04.856122'),
(14, 'auth', '0008_alter_user_username_max_length', '2024-03-30 03:37:04.871974'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2024-03-30 03:37:04.885362'),
(16, 'auth', '0010_alter_group_name_max_length', '2024-03-30 03:37:04.899996'),
(17, 'auth', '0011_update_proxy_permissions', '2024-03-30 03:37:04.911467'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2024-03-30 03:37:04.924712'),
(19, 'store', '0001_initial', '2024-03-30 03:37:04.932341'),
(20, 'device', '0001_initial', '2024-03-30 03:37:04.951415'),
(21, 'frame', '0001_initial', '2024-03-30 03:37:04.969547'),
(22, 'background', '0001_initial', '2024-03-30 03:37:04.988312'),
(23, 'background', '0002_alter_background_photo', '2024-03-30 03:37:05.001024'),
(24, 'background', '0003_background_photo_hover_background_position', '2024-03-30 03:37:05.017144'),
(25, 'background', '0004_alter_background_photo_hover', '2024-03-30 03:37:05.030042'),
(26, 'filter', '0001_initial', '2024-03-30 03:37:05.036936'),
(27, 'frame', '0002_alter_frame_photo', '2024-03-30 03:37:05.050945'),
(28, 'frame', '0003_frame_photo_hover', '2024-03-30 03:37:05.066663'),
(29, 'frame', '0004_frame_position', '2024-03-30 03:37:05.082623'),
(30, 'layout', '0001_initial', '2024-03-30 03:37:05.103607'),
(31, 'layout', '0002_alter_layout_photo', '2024-03-30 03:37:05.116498'),
(32, 'layout', '0003_layout_photo_hover_layout_position', '2024-03-30 03:37:05.134191'),
(33, 'layout', '0004_rename_photo_hover_layout_background', '2024-03-30 03:37:05.146782'),
(34, 'layout', '0005_rename_background_layout_photo_cover', '2024-03-30 03:37:05.157415'),
(35, 'layout', '0006_rename_photo_cover_layout_photo_hover', '2024-03-30 03:37:05.168404'),
(36, 'layout', '0007_rename_photo_hover_layout_photo_cover', '2024-03-30 03:37:05.180388'),
(37, 'layout', '0008_layout_frame', '2024-03-30 03:37:05.198652'),
(38, 'layout', '0009_alter_layout_frame', '2024-03-30 03:37:05.220086'),
(39, 'layout', '0010_alter_layout_frame', '2024-03-30 03:37:05.238562'),
(40, 'layout', '0011_alter_layout_frame', '2024-03-30 03:37:05.257466'),
(41, 'payment', '0001_initial', '2024-03-30 03:37:05.265353'),
(42, 'payment', '0002_remove_payment_secret_key_remove_payment_secret_pass_and_more', '2024-03-30 03:37:05.316718'),
(43, 'revenue', '0001_initial', '2024-03-30 03:37:05.379724'),
(44, 'sessions', '0001_initial', '2024-03-30 03:37:05.390512'),
(45, 'sticker', '0001_initial', '2024-03-30 03:37:05.397035'),
(46, 'sticker', '0002_alter_sticker_photo', '2024-03-30 03:37:05.408431'),
(47, 'background', '0005_remove_background_frame_id', '2024-03-30 06:43:59.511216'),
(48, 'layout', '0012_rename_background_id_layout_background', '2024-03-30 06:43:59.530764'),
(49, 'layout', '0013_layout_photo_full', '2024-03-30 08:14:40.685844'),
(50, 'frame', '0005_alter_frame_price', '2024-03-31 08:19:37.370544'),
(51, 'frame', '0006_cloudphoto', '2024-04-13 14:51:38.766583'),
(52, 'redeem', '0001_initial', '2024-04-13 14:51:38.784872'),
(53, 'redeem', '0002_redeem_date_used_redeem_is_used', '2024-04-13 15:47:09.744080'),
(54, 'revenue', '0002_order_photo_url_done', '2024-04-14 02:33:48.387098'),
(55, 'background', '0006_background_photo_kr_background_photo_kr_hover_and_more', '2024-04-15 12:26:45.533619');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('1i3f4xr3uo0t5rv2asr6jcpg4lhxg1yt', '.eJxVjMsOwiAQRf-FtSE8Zgp16d5vIANMpWpoUtqV8d-VpAtN7uqek_MSgfathL3xGuYszkKL0-8XKT24dpDvVG-LTEvd1jnKrsiDNnldMj8vh_sXKNRKz6JFZbVTBBDtBD6xh0GRHYAmA-i0MgY9Ykz6u5FGdg4oO_SOkY14fwCnZTaq:1rteaX:T1BPcJyoMSGWJu_ZiwUG4JbyqIyazD1fCE_OGajcs3o', '2024-04-22 02:18:25.802026'),
('2q9j4hm0fv4y84j5nw4crx2x9be5nccn', '.eJxVjMsOwiAQRf-FtSHDY2h16b7fQBgYpGogKe3K-O_apAvd3nPOfQkftrX4rfPi5yQuQonT70YhPrjuIN1DvTUZW12XmeSuyIN2ObXEz-vh_h2U0Mu3HjBipjxaCOSMAp1G4IwAGmgARVqjI4vonOWUVFSZ4GzQGCa2IVrx_gDOgTd8:1rvYfe:VjGQiepO4NBzSGOrIkhzlAw29IGrm6DIsD6jgCO9hp0', '2024-04-27 08:23:34.786338'),
('dwwb21cqib7xazf1nyl78v56x2oeai2w', '.eJxVjEEOwiAQRe_C2pCBpkBduvcMZIYZpGogKe3KeHdt0oVu_3vvv1TEbS1x67LEmdVZGXX63QjTQ-oO-I711nRqdV1m0ruiD9r1tbE8L4f7d1Cwl2_tgQyMPrDYINkkE4AIxaAjzuQmy-LBupRHF8IgEpKDiREHSR4HcOr9AfZZOIw:1rsxUY:Vu-F6MyzO0IFgnc2XPzi65VU9jfDn-fvzjps8jQWkMI', '2024-04-20 04:17:22.538846'),
('egoqvajkvgy7vhaasmenb8tam8g1mz7w', '.eJxVjMsOwiAQRf-FtSHDY2h16b7fQBgYpGogKe3K-O_apAvd3nPOfQkftrX4rfPi5yQuQonT70YhPrjuIN1DvTUZW12XmeSuyIN2ObXEz-vh_h2U0Mu3HjBipjxaCOSMAp1G4IwAGmgARVqjI4vonOWUVFSZ4GzQGCa2IVrx_gDOgTd8:1rvr0l:gGCdM96c7JYOuvC-ghOjlGeVauKrAK36NaI4IpUd-bM', '2024-04-28 03:58:35.908160'),
('gat08by2ph45d66aj05xq54ar80heg1s', '.eJxVjEEOwiAQRe_C2hCgFBmX7j0DYZhBqgaS0q6Md7dNutDte-__twhxXUpYO89hInERWpx-Gcb05LoLesR6bzK1uswTyj2Rh-3y1ohf16P9Oyixl21tk8OUbSaNgAMo7_VGENgNmlgpywDJOO0pZzYwUlTujJzGbLXhCOLzBf6xOJ0:1rqPbL:aytRgvr0FfaRsv_kcNQoXk90dAYQ3tC1tpKFqzcZ9DE', '2024-04-13 03:41:51.726914'),
('gw1bopx5nn57t5l2ubhlsuakq6exkm1e', '.eJxVjEEOwiAQRe_C2pCBpkBduvcMZIYZpGogKe3KeHdt0oVu_3vvv1TEbS1x67LEmdVZGXX63QjTQ-oO-I711nRqdV1m0ruiD9r1tbE8L4f7d1Cwl2_tgQyMPrDYINkkE4AIxaAjzuQmy-LBupRHF8IgEpKDiREHSR4HcOr9AfZZOIw:1rsg47:1RHaYiqITpuStEghDwKjYFJuMjnjehm9KsZ0X_ZvgnY', '2024-04-19 09:40:55.368030');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `filter_filter`
--

CREATE TABLE `filter_filter` (
  `id` bigint(20) NOT NULL,
  `title` longtext NOT NULL,
  `photo` varchar(100) NOT NULL,
  `color_mode` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `frame_cloudphoto`
--

CREATE TABLE `frame_cloudphoto` (
  `id` bigint(20) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `frame_frame`
--

CREATE TABLE `frame_frame` (
  `id` bigint(20) NOT NULL,
  `title` longtext NOT NULL,
  `photo` varchar(100) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) NOT NULL,
  `device_id_id` bigint(20) NOT NULL,
  `photo_hover` varchar(100) NOT NULL,
  `position` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `frame_frame`
--

INSERT INTO `frame_frame` (`id`, `title`, `photo`, `price`, `created_at`, `deleted_at`, `device_id_id`, `photo_hover`, `position`) VALUES
(1, 'Stripx2', 'frames/strip.png', 70000, '2024-03-30 06:24:28.713563', '2024-03-30 06:24:28.713563', 1, 'frames/strip_click.png', 'row-1-1'),
(2, '2cut-x2', 'frames/2cut.png', 100000, '2024-03-30 06:25:07.509362', '2024-03-30 06:25:07.509362', 1, 'frames/2cut_click.png', 'row-1-2'),
(3, '3-cutx2', 'frames/3cut.png', 100000, '2024-03-30 06:25:43.657124', '2024-03-30 06:25:43.658055', 1, 'frames/3cut_click.png', 'row-1-3'),
(4, '4-cutx2', 'frames/4cut.png', 100000, '2024-03-30 06:26:41.356490', '2024-03-30 06:26:41.356490', 1, 'frames/4cut_click.png', 'row-2-1'),
(5, '5-cutx2', 'frames/5cut.png', 100000, '2024-03-30 06:27:58.610482', '2024-03-30 06:27:58.610482', 1, 'frames/5cut_click.png', 'row-2-2'),
(6, '6-cutx2', 'frames/6cut.png', 100000, '2024-03-30 06:28:28.943494', '2024-03-30 06:28:28.943494', 1, 'frames/6cut_click.png', 'row-2-3');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `layout_layout`
--

CREATE TABLE `layout_layout` (
  `id` bigint(20) NOT NULL,
  `title` longtext NOT NULL,
  `photo` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) NOT NULL,
  `background_id` bigint(20) NOT NULL,
  `photo_cover` varchar(100) NOT NULL,
  `position` longtext NOT NULL,
  `frame_id` bigint(20) DEFAULT NULL,
  `photo_full` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `layout_layout`
--

INSERT INTO `layout_layout` (`id`, `title`, `photo`, `created_at`, `deleted_at`, `background_id`, `photo_cover`, `position`, `frame_id`, `photo_full`) VALUES
(1, 'Season-Strip-1', 'layouts/1_BG.png', '2024-03-30 08:16:46.145306', '2024-03-30 08:16:46.145306', 1, 'layouts/1_transparent.png', 'row-1-1', 1, 'layouts/1.png'),
(2, 'Season-Strip-2', 'layouts/2_BG.png', '2024-03-30 08:20:52.737589', '2024-03-30 08:20:52.737589', 1, 'layouts/2_transparent.png', 'row-1-2', 1, 'layouts/2.png'),
(3, 'Season-Strip-3', 'layouts/3_BG.png', '2024-03-30 08:21:55.331093', '2024-03-30 08:21:55.331093', 1, 'layouts/3_transparent.png', 'row-1-3', 1, 'layouts/3.png'),
(4, 'Season-Strip-4', 'layouts/4_BG.png', '2024-03-30 08:25:47.617974', '2024-03-30 08:25:47.617974', 1, 'layouts/4_transparent.png', 'row-1-4', 1, 'layouts/4.png'),
(5, 'Season-Strip-5', 'layouts/5_BG.png', '2024-03-30 08:26:49.630288', '2024-03-30 08:26:49.630288', 1, 'layouts/5_transparent.png', 'row-1-5', 1, 'layouts/5.png'),
(6, 'Party-Strip-1', 'layouts/1_BG_q1VUxFv.png', '2024-03-30 08:39:01.100033', '2024-03-30 08:39:01.100033', 2, 'layouts/1_transparent_FACsSnV.png', 'row-1-1', 1, 'layouts/1_fZ7jlAS.png'),
(7, 'Party-Strip-2', 'layouts/2_BG_K0yzbvS.png', '2024-03-30 08:42:38.701027', '2024-03-30 08:42:38.701027', 2, 'layouts/2_transparent_bcSpFTV.png', 'row-1-2', 1, 'layouts/2_Mmq19Zh.png'),
(8, 'Party-Strip-3', 'layouts/3_BG_sqheFGl.png', '2024-03-30 08:44:55.006444', '2024-03-30 08:44:55.006444', 2, 'layouts/3_transparent_VPMG3uK.png', 'row-1-3', 1, 'layouts/3_DkgN1JZ.png'),
(9, 'Party-Strip-4', 'layouts/4_BG_SbWKXrn.png', '2024-03-30 09:03:52.177168', '2024-03-30 09:03:52.177168', 2, 'layouts/4_transparent_77NJRW9.png', 'row-1-4', 1, 'layouts/4_wt69D6X.png'),
(10, 'Party-Strip-5', 'layouts/5_BG_j8QwxuX.png', '2024-03-30 09:16:11.437135', '2024-03-30 09:16:11.437135', 2, 'layouts/5_transparent_86Ju7EB.png', 'row-1-5', 1, 'layouts/5_5CzVakK.png'),
(11, 'Cartoon-Strip-1', 'layouts/1_BG_mf2Q8H9.png', '2024-03-30 09:38:59.241744', '2024-03-30 09:38:59.241744', 3, 'layouts/1_transparent_jXklffB.png', 'row-1-1', 1, 'layouts/1_UnOhF7u.png'),
(12, 'Cartoon-Strip-2', 'layouts/2_BG_zxbdgjF.png', '2024-03-30 09:40:58.711118', '2024-03-30 09:40:58.711118', 3, 'layouts/2_transparent_5yP2Dwl.png', 'row-1-2', 1, 'layouts/2_WRQa0vX.png'),
(13, 'Cartoon-Strip-3', 'layouts/3_BG_QuNAt3J.png', '2024-03-30 09:45:14.639489', '2024-03-30 09:45:14.639489', 3, 'layouts/3_transparent_LMQaKHR.png', 'row-1-3', 1, 'layouts/3_PMRtehh.png'),
(14, 'Cartoon-Strip-4', 'layouts/4_BG_qdZ6P0F.png', '2024-03-30 09:46:26.399886', '2024-03-30 09:46:26.399886', 3, 'layouts/4_transparent_9aNRM3J.png', 'row-1-4', 1, 'layouts/4_PeJKnJR.png'),
(15, 'Cartoon-Strip-5', 'layouts/5_BG_4TbfmJN.png', '2024-03-30 09:47:17.493432', '2024-03-30 09:47:17.493432', 3, 'layouts/5_transparent_T7t0auF.png', 'row-1-5', 1, 'layouts/5_Nfsk01O.png'),
(16, 'Minimalism-Strip-1', 'layouts/1_BG_u3ZeYNa.png', '2024-03-30 10:11:12.475313', '2024-03-30 10:11:12.475313', 4, 'layouts/1_transparent_A0nT378.png', 'row-1-1', 1, 'layouts/1_QocBFXj.png'),
(17, 'Minimalism-Strip-2', 'layouts/2_BG_dLNHOCs.png', '2024-03-30 10:14:19.453104', '2024-03-30 10:14:19.453104', 4, 'layouts/2_transparent_hIlHbBA.png', 'row-1-2', 1, 'layouts/2_MluUId7.png'),
(18, 'Minimalism-Strip-3', 'layouts/3_BG_Va4PK47.png', '2024-03-30 10:15:35.677962', '2024-03-30 10:15:35.677962', 4, 'layouts/3_transparent_mIlodJm.png', 'row-1-3', 1, 'layouts/3_QvdUDW7.png'),
(19, 'Minimalism-Strip-4', 'layouts/4_BG_RNoCQrC.png', '2024-03-30 10:18:05.475313', '2024-03-30 10:18:05.475313', 4, 'layouts/4_transparent_9LmRHxy.png', 'row-1-4', 1, 'layouts/4_QEZCCVu.png'),
(20, 'Minimalism-Strip-5', 'layouts/7_BG.png', '2024-03-30 10:20:17.269300', '2024-03-30 10:20:17.269300', 4, 'layouts/7_transparent.png', 'row-1-5', 1, 'layouts/7.png'),
(21, 'Season-2cut-1', 'layouts/1_BG_n28YuXl.png', '2024-03-30 10:31:15.813754', '2024-03-30 10:31:15.813754', 1, 'layouts/1_transparent_w0SdSEn.png', 'row-1-1', 2, 'layouts/1_zTuoZYy.png'),
(22, 'Season-2cut-2', 'layouts/2_BG_k3BeaY5.png', '2024-03-30 14:33:10.906662', '2024-03-30 14:33:10.906662', 1, 'layouts/2_transparent_4Oqpdqc.png', 'row-1-2', 2, 'layouts/2_rCS2IhT.png'),
(23, 'Season-2cut-3', 'layouts/3_BG_ceAkAd8.png', '2024-03-30 14:34:46.687760', '2024-03-30 14:34:46.687760', 1, 'layouts/3_transparent_1WSDNAG.png', 'row-1-3', 2, 'layouts/3_LxMGdf6.png'),
(24, 'Season-2cut-4', 'layouts/4_BG_SWDlNZV.png', '2024-03-30 14:36:06.547505', '2024-03-30 14:36:06.547505', 1, 'layouts/4_transparent_d1FRr2f.png', 'row-1-4', 2, 'layouts/4_8OzFVVR.png'),
(25, 'Party-2cut-1', 'layouts/1_BG_n4RXJ85.png', '2024-03-30 15:01:05.276445', '2024-03-30 15:01:05.276445', 2, 'layouts/1_transparent_GuEGJPD.png', 'row-1-1', 2, 'layouts/1_YysTBee.png'),
(26, 'Party-2cut-2', 'layouts/2_BG_PQKA9bw.png', '2024-03-30 15:21:45.421925', '2024-03-30 15:21:45.421925', 2, 'layouts/2_transparent_nqfsvrs.png', 'row-1-2', 2, 'layouts/2_bf0ks74.png'),
(27, 'Party-2cut-3', 'layouts/3_BG_WgTVyuC.png', '2024-03-30 15:23:32.760127', '2024-03-30 15:23:32.760127', 2, 'layouts/3_transparent_NIFRyWu.png', 'row-1-3', 2, 'layouts/3_BrlTiuD.png'),
(28, 'Party-2cut-4', 'layouts/4_BG_obxt4CE.png', '2024-03-30 15:24:25.812447', '2024-03-30 15:24:25.812447', 2, 'layouts/4_transparent_8Yh6YtN.png', 'row-1-4', 2, 'layouts/4_jXiaunu.png'),
(29, 'Party-2cut-5', 'layouts/5_BG_wYGykbk.png', '2024-03-30 15:25:17.942603', '2024-03-30 15:25:17.942603', 2, 'layouts/5_transparent_xosUyIq.png', 'row-1-5', 2, 'layouts/5_ScdKtzq.png'),
(30, 'Cartoon-2cut-1', 'layouts/1_BG_lE5jQtj.png', '2024-03-30 15:26:45.092606', '2024-03-30 15:26:45.092606', 3, 'layouts/1_transparent_rvjXhW5.png', 'row-1-1', 2, 'layouts/1_dHeO7eQ.png'),
(31, 'Cartoon-2cut-2', 'layouts/2_BG_B6eFflS.png', '2024-03-30 15:28:04.401225', '2024-03-30 15:28:04.401225', 3, 'layouts/2_transparent_cWrVmo0.png', 'row-1-2', 2, 'layouts/2_hTqLKrp.png'),
(32, 'Cartoon-2cut-3', 'layouts/3_BG_dwnkPgh.png', '2024-03-30 15:30:10.914807', '2024-03-30 15:30:10.914807', 3, 'layouts/3_transparent_snWBSm6.png', 'row-1-3', 2, 'layouts/3_WnXRmxJ.png'),
(33, 'Cartoon-2cut-4', 'layouts/4_BG_pRyi3bB.png', '2024-03-30 15:31:24.364485', '2024-03-30 15:31:24.364485', 3, 'layouts/4_transparent_yC5iywU.png', 'row-1-4', 2, 'layouts/4_1yEVpoz.png'),
(34, 'Cartoon-2cut-5', 'layouts/5_BG_5lnx8KN.png', '2024-03-30 15:32:44.876484', '2024-03-30 15:32:44.876484', 3, 'layouts/5_transparent_Zb1JHYX.png', 'row-1-5', 2, 'layouts/5_8HNmaXn.png'),
(35, 'Minimalism-2Cut-1', 'layouts/1_BG_UJl5YRQ.png', '2024-03-30 15:33:45.108328', '2024-03-30 15:33:45.108328', 4, 'layouts/1_transparent_12R28t4.png', 'row-1-1', 2, 'layouts/1_9gEp5aA.png'),
(36, 'Minimalism-2Cut-2', 'layouts/2_BG_uCCM9ut.png', '2024-03-30 15:34:22.276787', '2024-03-30 15:34:22.276787', 4, 'layouts/2_transparent_O3nyo4z.png', 'row-1-2', 2, 'layouts/2_cPWnHc1.png'),
(37, 'Minimalism-2Cut-3', 'layouts/3_BG_cLcFdvF.png', '2024-03-30 15:36:13.443687', '2024-03-30 15:36:13.443687', 4, 'layouts/3_transparent_XToqtD3.png', 'row-1-3', 2, 'layouts/3_WxjYpWg.png'),
(38, 'Minimalism-2Cut-4', 'layouts/4_BG_ZIKXFXH.png', '2024-03-30 15:37:04.310539', '2024-03-30 15:37:04.310539', 4, 'layouts/4_transparent_TbkAEFe.png', 'row-1-4', 2, 'layouts/4_PkSqcuk.png'),
(39, 'Minimalism-2Cut-5', 'layouts/5_BG_MxaCq4j.png', '2024-03-30 15:39:05.140519', '2024-03-30 15:39:05.140519', 4, 'layouts/5_transparent_hw1OqUN.png', 'row-1-5', 2, 'layouts/5_soox7ji.png'),
(40, 'Season-3cut-1', 'layouts/1_BG_X7vbUyV.png', '2024-03-30 15:42:54.692710', '2024-03-30 15:42:54.692710', 1, 'layouts/1_transparent_GF0RWsT.png', 'row-1-1', 3, 'layouts/1_cXUY0C1.png'),
(41, 'Season-3cut-2', 'layouts/2_BG_PP50ZZE.png', '2024-03-30 15:44:09.984293', '2024-03-30 15:44:09.984293', 1, 'layouts/2_transparent_1PlU0ef.png', 'row-1-2', 3, 'layouts/2_jTzLsAD.png'),
(42, 'Season-3cut-3', 'layouts/3_BG_76tfSGD.png', '2024-03-30 15:44:53.052226', '2024-03-30 15:44:53.052226', 1, 'layouts/3_transparent_xGsITn8.png', 'row-1-3', 3, 'layouts/3_rFOUPa1.png'),
(43, 'Season-3cut-4', 'layouts/4_BG_TSeFCF7.png', '2024-03-30 15:46:06.772149', '2024-03-30 15:46:06.772149', 1, 'layouts/4_transparent_BH20g6e.png', 'row-1-4', 3, 'layouts/4_9JMYtO2.png'),
(44, 'Season-3cut-5', 'layouts/5_BG_2Qumiks.png', '2024-03-30 15:47:47.554334', '2024-03-30 15:47:47.554334', 1, 'layouts/5_transparent_QiGfGxM.png', 'row-1-5', 3, 'layouts/5_D43GowD.png'),
(45, 'Party-3cut-1', 'layouts/1_BG_YGCZbAB.png', '2024-03-30 15:49:38.358464', '2024-03-30 15:49:38.358464', 2, 'layouts/1_transparent_VodNBXr.png', 'row-1-1', 3, 'layouts/1_O9t1bUm.png'),
(46, 'Party-3cut-2', 'layouts/2_BG_LYguCyZ.png', '2024-03-30 15:50:39.052366', '2024-03-30 15:50:39.052366', 2, 'layouts/2_transparent_O91V5ov.png', 'row-1-2', 3, 'layouts/2_kiiVSya.png'),
(47, 'Party-3cut-3', 'layouts/3_BG_Om6kcwW.png', '2024-03-30 15:59:03.587594', '2024-03-30 15:59:03.587594', 2, 'layouts/3_transparent_uJe3Lzd.png', 'row-1-3', 3, 'layouts/3_Jb32Zgb.png'),
(48, 'Party-3cut-4', 'layouts/4_BG_EQacLsZ.png', '2024-03-30 16:01:19.032847', '2024-03-30 16:01:19.032847', 2, 'layouts/4_transparent_ZTb8ZiX.png', 'row-1-4', 3, 'layouts/4_XL0zM3d.png'),
(49, 'Party-3cut-5', 'layouts/5_BG_aQDZD4m.png', '2024-03-30 16:02:24.072784', '2024-03-30 16:02:24.072784', 2, 'layouts/5_transparent_C7rC8O1.png', 'row-1-5', 3, 'layouts/5_xmUh9sJ.png'),
(50, 'Cartoon-3cut-1', 'layouts/1_BG_hyk68kl.png', '2024-03-30 16:03:25.683745', '2024-03-30 16:03:25.683745', 3, 'layouts/1_transparent_g63VHd7.png', 'row-1-1', 3, 'layouts/1_E1posLE.png'),
(51, 'Cartoon-3cut-2', 'layouts/2_BG_ASexBHd.png', '2024-03-30 16:04:08.300027', '2024-03-30 16:04:08.300027', 3, 'layouts/2_transparent_TQH73x9.png', 'row-1-2', 3, 'layouts/2_Lzu1loQ.png'),
(52, 'Cartoon-3cut-3', 'layouts/3_BG_fBAbr76.png', '2024-03-30 16:05:00.053577', '2024-03-30 16:05:00.053577', 3, 'layouts/3_transparent_EfLfwN5.png', 'row-1-3', 3, 'layouts/3_2hdOIRa.png'),
(53, 'Cartoon-3cut-4', 'layouts/4_BG_zaE9Pn5.png', '2024-03-30 16:05:50.174258', '2024-03-30 16:05:50.174258', 3, 'layouts/4_transparent_7FqGNXP.png', 'row-1-4', 3, 'layouts/4_8qYyQkt.png'),
(54, 'Cartoon-3cut-5', 'layouts/5_BG_BwWDEnB.png', '2024-03-30 16:07:02.193237', '2024-03-30 16:07:02.193237', 3, 'layouts/5_transparent_40WWC9r.png', 'row-1-5', 3, 'layouts/5_HIF58VQ.png'),
(55, 'Minimalism-3cut-1', 'layouts/1_BG_PSKvEWh.png', '2024-03-30 16:08:28.662649', '2024-03-30 16:08:28.662649', 4, 'layouts/1_transparent_WDM60z6.png', 'row-1-1', 3, 'layouts/1_vf2YNXO.png'),
(56, 'Minimalism-3cut-2', 'layouts/2_BG_2lkdi7u.png', '2024-03-30 16:09:22.398560', '2024-03-30 16:09:22.398560', 4, 'layouts/2_transparent_6wsYCbL.png', 'row-1-2', 3, 'layouts/2_8YQY4I8.png'),
(57, 'Minimalism-3cut-3', 'layouts/3_BG_WWAiFHM.png', '2024-03-30 16:10:18.429709', '2024-03-30 16:10:18.429709', 4, 'layouts/3_transparent_dcIcRFa.png', 'row-1-3', 3, 'layouts/3_zUGkR6A.png'),
(58, 'Minimalism-3cut-4', 'layouts/4_BG_jZZiUx0.png', '2024-03-30 16:11:04.384457', '2024-03-30 16:11:04.384457', 4, 'layouts/4_transparent_t3qYMu8.png', 'row-1-4', 3, 'layouts/4_cCdQ0R3.png'),
(59, 'Minimalism-3Cut-5', 'layouts/5_BG_hFwazLz.png', '2024-03-30 16:11:54.142301', '2024-03-30 16:11:54.142301', 4, 'layouts/5_transparent_yd5NAHz.png', 'row-1-5', 3, 'layouts/5_j2iTVcS.png'),
(60, 'Season-4cut-1', 'layouts/1_BG_uzEKW8P.png', '2024-03-30 16:13:00.959193', '2024-03-30 16:13:00.959193', 1, 'layouts/1_transparent_6459kwB.png', 'row-1-1', 4, 'layouts/1_SlONZsr.png'),
(61, 'Season-4cut-2', 'layouts/2_BG_64LfktO.png', '2024-03-31 02:33:10.114701', '2024-03-31 02:33:10.114701', 1, 'layouts/2_transparent_qElvTlH.png', 'row-1-2', 4, 'layouts/2_WwQ5EXu.png'),
(62, 'Season-4cut-3', 'layouts/3_BG_6IClhWn.png', '2024-03-31 02:37:35.780987', '2024-03-31 02:37:35.780987', 1, 'layouts/3_transparent_R1oGLy0.png', 'row-1-3', 4, 'layouts/3_Y9NKDjb.png'),
(63, 'Season-4cut-4', 'layouts/4_BG_DNW8Dov.png', '2024-03-31 02:39:02.249679', '2024-03-31 02:39:02.249679', 1, 'layouts/4_transparent_LK5b7y4.png', 'row-1-4', 4, 'layouts/4_FTCwpjp.png'),
(64, 'Season-4cut-5', 'layouts/5_BG_Mj15Ex2.png', '2024-03-31 02:39:55.418779', '2024-03-31 02:39:55.418779', 1, 'layouts/5_transparent_xQjNiu7.png', 'row-1-5', 4, 'layouts/5_56X8DYa.png'),
(65, 'Party-4cut-1', 'layouts/1_BG_efH7Df7.png', '2024-03-31 02:44:28.741520', '2024-03-31 02:44:28.741520', 2, 'layouts/1_transparent_dOWXELt.png', 'row-1-1', 4, 'layouts/1_Nv5AxHK.png'),
(66, 'Party-4cut-2', 'layouts/2_BG_kPVKmIa.png', '2024-03-31 02:45:07.413326', '2024-03-31 02:45:07.413326', 2, 'layouts/2_transparent_kGIrXds.png', 'row-1-2', 4, 'layouts/2_3o0V15Z.png'),
(67, 'Party-4cut-3', 'layouts/3_BG_EnxO1qV.png', '2024-03-31 02:46:04.620431', '2024-03-31 02:46:04.620431', 2, 'layouts/3_transparent_08dAcHA.png', 'row-1-3', 4, 'layouts/3_hFYbNOR.png'),
(68, 'Party-4cut-4', 'layouts/4_BG_Bz3fT0d.png', '2024-03-31 02:46:50.003043', '2024-03-31 02:46:50.003043', 2, 'layouts/4_transparent_ohldttB.png', 'row-1-4', 4, 'layouts/4_6XuhUMH.png'),
(69, 'Party-4cut-5', 'layouts/5_BG_tknjGuZ.png', '2024-03-31 02:47:32.918388', '2024-03-31 02:47:32.918388', 2, 'layouts/5_transparent_aVu7lAb.png', 'row-1-5', 4, 'layouts/5_g2rLGZf.png'),
(70, 'Cartoon-4cut-1', 'layouts/1_BG_cuzY0je.png', '2024-03-31 02:49:03.756070', '2024-03-31 02:49:03.756070', 3, 'layouts/1_transparent_BXkHC9q.png', 'row-1-1', 4, 'layouts/1_Rcl4eXL.png'),
(71, 'Cartoon-4cut-2', 'layouts/2_BG_JzUNyhw.png', '2024-03-31 02:50:16.970846', '2024-03-31 02:50:16.970846', 3, 'layouts/2_transparent_eHitApJ.png', 'row-1-2', 4, 'layouts/2_ErOh2rL.png'),
(72, 'Cartoon-4cut-3', 'layouts/3_BG_znJUlH9.png', '2024-03-31 02:52:47.482023', '2024-03-31 02:52:47.482023', 3, 'layouts/3_transparent_Na7qHA1.png', 'row-1-3', 4, 'layouts/3_uLMfdeq.png'),
(73, 'Cartoon-4cut-4', 'layouts/4_BG_IYX3XBH.png', '2024-03-31 02:53:24.494209', '2024-03-31 02:53:24.494209', 3, 'layouts/4_transparent_WHDqp6K.png', 'row-1-4', 4, 'layouts/4_nCogEMF.png'),
(74, 'Cartoon-4cut-5', 'layouts/5_BG_1yD5oSo.png', '2024-03-31 02:54:16.271185', '2024-03-31 02:54:16.271185', 3, 'layouts/5_transparent_KUPU11s.png', 'row-1-5', 4, 'layouts/5_zllyEYa.png'),
(75, 'Minimalism-4cut-1', 'layouts/1_BG_sB035GO.png', '2024-03-31 02:55:43.823535', '2024-03-31 02:55:43.823535', 4, 'layouts/1_transparent_AgojdeP.png', 'row-1-1', 4, 'layouts/1_lKZsTZP.png'),
(76, 'Minimalism-4cut-2', 'layouts/2_BG_M1Iyktr.png', '2024-03-31 02:56:26.301172', '2024-03-31 02:56:26.301172', 4, 'layouts/2_transparent_D277Cgi.png', 'row-1-2', 4, 'layouts/2_Dh8csBx.png'),
(77, 'Minimalism-4cut-3', 'layouts/3_BG_ZSUvKcT.png', '2024-03-31 02:57:17.832017', '2024-03-31 02:57:17.832017', 4, 'layouts/3_transparent_Y8H6AnZ.png', 'row-1-3', 4, 'layouts/3_rO42Bgr.png'),
(78, 'Minimalism-4cut-4', 'layouts/4_BG_a9Re5cr.png', '2024-03-31 02:58:42.939897', '2024-03-31 02:58:42.939897', 4, 'layouts/4_transparent_iWAmiOV.png', 'row-1-4', 4, 'layouts/4_1RTi11w.png'),
(79, 'Minimalism-4cut-5', 'layouts/5_BG_J37MObs.png', '2024-03-31 03:00:20.421635', '2024-03-31 03:00:20.421635', 4, 'layouts/5_transparent_XBNgV2x.png', 'row-1-5', 4, 'layouts/5_umhZyuW.png'),
(80, 'Season-5cut-1', 'layouts/3_BG_QIi0olw.png', '2024-03-31 03:02:23.903500', '2024-03-31 03:02:23.903500', 1, 'layouts/3_transparent_W3aic16.png', 'row-1-1', 5, 'layouts/3_0pwUG3B.png'),
(81, 'Season-5cut-2', 'layouts/4_BG_WUczlFC.png', '2024-03-31 03:03:04.470301', '2024-03-31 03:03:04.470301', 1, 'layouts/4_transparent_1DYvfFu.png', 'row-1-2', 5, 'layouts/4_aLkxEki.png'),
(82, 'Season-5cut-3', 'layouts/5_BG_FoGSLGY.png', '2024-03-31 03:03:51.892394', '2024-03-31 03:03:51.892394', 1, 'layouts/5_transparent_wWGU3vb.png', 'row-1-3', 5, 'layouts/5_dCaavkb.png'),
(83, 'Season-5cut-4', 'layouts/6_BG.png', '2024-03-31 03:04:33.131284', '2024-03-31 03:04:33.131284', 1, 'layouts/6_transparent.png', 'row-1-4', 5, 'layouts/6.png'),
(84, 'Season -5cut-5', 'layouts/7_BG_m4Wn6Ma.png', '2024-03-31 03:05:13.236730', '2024-03-31 03:05:13.236730', 1, 'layouts/7_transparent_dhoEWpV.png', 'row-1-5', 5, 'layouts/7_H9rp6gC.png'),
(85, 'Party-5cut-1', 'layouts/1_BG_QkboBvF.png', '2024-03-31 03:13:07.957011', '2024-03-31 03:13:07.957011', 2, 'layouts/1_transparent_A59P9Z5.png', 'row-1-1', 5, 'layouts/1_ZUNSymZ.png'),
(86, 'Party-5cut-2', 'layouts/2_BG_teJ4aAY.png', '2024-03-31 03:15:37.057528', '2024-03-31 03:15:37.057528', 2, 'layouts/2_transparent_ZdfX4wR.png', 'row-1-2', 5, 'layouts/2_Va8SDtz.png'),
(87, 'Party-5cut-3', 'layouts/3_BG_33nhQMY.png', '2024-03-31 03:17:20.435897', '2024-03-31 03:17:20.435897', 2, 'layouts/3_transparent_8jKiVuo.png', 'row-1-3', 5, 'layouts/3_QKpsCgZ.png'),
(88, 'Party-5cut-4', 'layouts/4_BG_tFN3pIn.png', '2024-03-31 03:20:24.053408', '2024-03-31 03:20:24.053408', 2, 'layouts/4_transparent_E7IHYSL.png', 'row-1-4', 5, 'layouts/4_ScWlWuy.png'),
(89, 'Party-5cut-5', 'layouts/5_BG_PHeyBeD.png', '2024-03-31 03:21:14.376938', '2024-03-31 03:21:14.376938', 2, 'layouts/5_transparent_rJ7T2zd.png', 'row-1-5', 5, 'layouts/5_yJlRO6N.png'),
(90, 'Cartoon-5cut-1', 'layouts/1_BG_HEWXCf8.png', '2024-03-31 03:22:04.361346', '2024-03-31 03:22:04.361346', 3, 'layouts/1_transparent_ct9in9Y.png', 'row-1-1', 5, 'layouts/1_ZhJpT1U.png'),
(91, 'Cartoon-5cut-2', 'layouts/2_BG_Ml0DNyY.png', '2024-03-31 03:22:47.347589', '2024-03-31 03:22:47.347589', 3, 'layouts/2_transparent_8OsevYP.png', 'row-1-2', 5, 'layouts/2_cFQmKMo.png'),
(92, 'Cartoon-5cut-3', 'layouts/3_BG_OyF2ivq.png', '2024-03-31 03:23:44.832609', '2024-03-31 03:23:44.832609', 3, 'layouts/3_transparent_ZIsCeOn.png', 'row-1-3', 5, 'layouts/3_yXAZfjL.png'),
(93, 'Cartoon-5cut-4', 'layouts/4_BG_PlWGqBK.png', '2024-03-31 03:31:58.374348', '2024-03-31 03:31:58.374348', 3, 'layouts/4_transparent_Z0lM0Wl.png', 'row-1-4', 4, 'layouts/4_bMYABO4.png'),
(94, 'Cartoon-5cut-5', 'layouts/5_BG_1e398xj.png', '2024-03-31 03:33:30.505423', '2024-03-31 03:33:30.505423', 3, 'layouts/5_transparent_deAmTQL.png', 'row-1-5', 5, 'layouts/5_r9babAL.png'),
(95, 'Minimalism-5cut-1', 'layouts/1_BG_hJC0ssk.png', '2024-03-31 03:35:39.684536', '2024-03-31 03:35:39.684536', 4, 'layouts/1_transparent_fgAXmvY.png', 'row-1-1', 5, 'layouts/1_axEO90N.png'),
(96, 'Minimalism-5cut-2', 'layouts/2_BG_tYSiRSR.png', '2024-03-31 03:39:12.506135', '2024-03-31 03:39:12.506135', 4, 'layouts/2_transparent_MCiL6QZ.png', 'row-1-2', 5, 'layouts/2_rZu7lGP.png'),
(97, 'Minimalism-5cut-3', 'layouts/3_BG_a8gNZfX.png', '2024-03-31 03:40:34.292994', '2024-03-31 03:40:34.293989', 4, 'layouts/3_transparent_B6bT1jY.png', 'row-1-3', 5, 'layouts/3_Rr0yEdM.png'),
(98, 'Minimalism-5cut-4', 'layouts/4_BG_zTq5ACV.png', '2024-03-31 03:43:22.737923', '2024-03-31 03:43:22.737923', 4, 'layouts/4_transparent_Y95iOg6.png', 'row-1-4', 5, 'layouts/4_UzsKRwC.png'),
(99, 'Minimalism-5cut-5', 'layouts/5_BG_2uu1nwX.png', '2024-03-31 03:44:16.519745', '2024-03-31 03:44:16.519745', 4, 'layouts/5_transparent_wSi37A1.png', 'row-1-5', 5, 'layouts/5_hWNwR8W.png'),
(100, 'Season-6cut-1', 'layouts/1_BG_DYTD3Dh.png', '2024-03-31 03:45:20.424344', '2024-03-31 03:45:20.424344', 1, 'layouts/1_transparent_XnZzPy3.png', 'row-1-1', 6, 'layouts/1_thNupqY.png'),
(101, 'Season-6cut-2', 'layouts/2_BG_fgQfWrK.png', '2024-03-31 03:47:39.995345', '2024-03-31 03:47:39.995345', 1, 'layouts/2_transparent_r3Zx9WW.png', 'row-1-2', 6, 'layouts/2_5EFRUnp.png'),
(102, 'Season-6cut-3', 'layouts/3_BG_mjvoknC.png', '2024-03-31 04:00:25.384160', '2024-03-31 04:00:25.384160', 1, 'layouts/3_transparent_s6k7GQC.png', 'row-1-3', 6, 'layouts/3_ftXGrmq.png'),
(103, 'Season-6cut-4', 'layouts/4_BG_EB18Lpe.png', '2024-03-31 04:07:55.986468', '2024-03-31 04:07:55.986468', 1, 'layouts/4_transparent_sQFUMaL.png', 'row-1-4', 6, 'layouts/4_yUnVTfd.png'),
(104, 'Season-6cut-5', 'layouts/5_BG_LbYcu1M.png', '2024-03-31 04:08:34.335933', '2024-03-31 04:08:34.335933', 1, 'layouts/5_transparent_XMMDFiF.png', 'row-1-5', 6, 'layouts/5_c3LJcsU.png'),
(105, 'Party-6cut-1', 'layouts/1_BG_ZesZX81.png', '2024-03-31 04:14:45.507457', '2024-03-31 04:14:45.507457', 2, 'layouts/2_transparent_tg2K9dn.png', 'row-1-1', 6, 'layouts/1_BZcGOS9.png'),
(106, 'Party-6cut-2', 'layouts/2_BG_Fxesn4K.png', '2024-03-31 04:15:27.888475', '2024-03-31 04:15:27.888475', 2, 'layouts/2_transparent_xKO5neS.png', 'row-1-2', 6, 'layouts/2_vKKzCyU.png'),
(107, 'Party-6cut-3', 'layouts/3_BG_UNDaUel.png', '2024-03-31 04:16:30.920220', '2024-03-31 04:16:30.920220', 2, 'layouts/3_transparent_Dka8Kus.png', 'row-1-3', 6, 'layouts/3_iJbJfHj.png'),
(108, 'Party-6cut-4', 'layouts/4_BG_5zuQxyp.png', '2024-03-31 04:17:35.045137', '2024-03-31 04:17:35.045137', 2, 'layouts/4_transparent_zu8Dgfr.png', 'row-1-4', 6, 'layouts/4_PnHCraR.png'),
(109, 'Party-6cut-5', 'layouts/5_BG_YMmpAE9.png', '2024-03-31 04:20:09.825223', '2024-03-31 04:20:09.825223', 2, 'layouts/5_transparent_ts38AUT.png', 'row-1-5', 6, 'layouts/5_xNVZUEh.png'),
(110, 'Cartoon-6cut-1', 'layouts/1_BG_hwn9V1P.png', '2024-03-31 04:22:59.906477', '2024-03-31 04:22:59.906477', 3, 'layouts/1_transparent_ZZaDSxm.png', 'row-1-1', 6, 'layouts/1_AQeiHnY.png'),
(111, 'Cartoon-6cut-2', 'layouts/2_BG_otdZq9q.png', '2024-03-31 04:23:57.400541', '2024-03-31 04:23:57.400541', 3, 'layouts/2_transparent_pACeygb.png', 'row-1-2', 6, 'layouts/2_pPa1Hx7.png'),
(112, 'Cartoon-6cut-3', 'layouts/3_BG_m2zayyc.png', '2024-03-31 04:24:36.571250', '2024-03-31 04:24:36.571250', 3, 'layouts/3_transparent_UJqoDs8.png', 'row-1-3', 6, 'layouts/3_E3Fiy14.png'),
(113, 'Cartoon-6cut-4', 'layouts/4_BG_AmcdoKv.png', '2024-03-31 04:26:06.130213', '2024-03-31 04:26:06.130213', 3, 'layouts/4_transparent_0guJHjG.png', 'row-1-4', 6, 'layouts/4_B71NfuY.png'),
(114, 'Cartoon-6cut-5', 'layouts/5_BG_ik16RvB.png', '2024-03-31 04:28:27.709129', '2024-03-31 04:28:27.709129', 3, 'layouts/5_transparent_ND896mX.png', 'row-1-5', 6, 'layouts/5_eTadC9J.png'),
(115, 'Minimalism-6cut-1', 'layouts/1_BG_WOATO2n.png', '2024-03-31 04:29:58.988833', '2024-03-31 04:29:58.988833', 4, 'layouts/1_transparent_Zryk0VT.png', 'row-1-1', 6, 'layouts/1_Jh6rvDc.png'),
(116, 'Minimalism-6cut-2', 'layouts/2_BG_x4qDDJs.png', '2024-03-31 04:31:53.084510', '2024-03-31 04:31:53.084510', 4, 'layouts/2_transparent_3YxG00X.png', 'row-1-2', 6, 'layouts/2_SYavLJG.png'),
(117, 'Minimalism-6cut-3', 'layouts/3_BG_n0FNTsK.png', '2024-03-31 04:32:36.107543', '2024-03-31 04:32:36.107543', 4, 'layouts/3_transparent_dcqTxCm.png', 'row-1-3', 6, 'layouts/3_4mM180j.png'),
(118, 'Minimalism-6cut-4', 'layouts/4_BG_Jqlh0Cr.png', '2024-03-31 04:33:14.884819', '2024-03-31 04:33:14.884819', 4, 'layouts/4_transparent_mLpfHh4.png', 'row-1-4', 6, 'layouts/4_rORWFG2.png'),
(119, 'Minimalism-6cut-5', 'layouts/5_BG_qPcKLE0.png', '2024-03-31 04:34:55.929530', '2024-03-31 04:34:55.929530', 4, 'layouts/5_transparent_pLyfBps.png', 'row-1-5', 6, 'layouts/5_dCiKSzv.png'),
(120, 'Season-2cut-5', 'layouts/5_BG_SMziSsQ.png', '2024-03-31 06:40:29.848268', '2024-03-31 06:40:29.848268', 1, 'layouts/5_transparent_e8dWL9K.png', 'row-1-5', 2, 'layouts/5_ISBee0t.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_payment`
--

CREATE TABLE `payment_payment` (
  `id` bigint(20) NOT NULL,
  `method` longtext NOT NULL,
  `name` longtext NOT NULL,
  `token` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `appID` longtext NOT NULL,
  `code` longtext NOT NULL,
  `endpoint_prod` longtext NOT NULL,
  `endpoint_sandbox` longtext NOT NULL,
  `key1` longtext NOT NULL,
  `key2` longtext NOT NULL,
  `password` longtext NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `username` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `payment_payment`
--

INSERT INTO `payment_payment` (`id`, `method`, `name`, `token`, `created_at`, `is_active`, `appID`, `code`, `endpoint_prod`, `endpoint_sandbox`, `key1`, `key2`, `password`, `updated_at`, `username`) VALUES
(1, 'QR_CODE', 'Zalopay', '2553', '2024-03-31 07:57:39.051294', 1, '2553', 'zalopay', 'https://sb-openapi.zalopay.vn/v2/create', 'https://sb-openapi.zalopay.vn/v2/create', 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL', 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz', '123', '2024-03-31 07:57:39.051294', 'photomong'),
(2, 'CASH', 'Cash', '1234567890', '2024-04-08 02:19:30.116504', 1, '123', 'Cash', '1111111111', '1111111111', '123a', '123b', '123', '2024-04-08 02:19:30.116504', 'cash'),
(3, 'CASH', 'Redeem code', '123456789', '2024-04-13 13:25:33.130436', 1, '123456789', 'REDEEM', 'http://localhost', 'http://localhost', '123456789', '123456789', '123', '2024-04-13 13:25:33.130436', 'demo');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `redeem_redeem`
--

CREATE TABLE `redeem_redeem` (
  `id` bigint(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `expired_at` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_used` datetime(6) DEFAULT NULL,
  `is_used` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `redeem_redeem`
--

INSERT INTO `redeem_redeem` (`id`, `code`, `amount`, `expired_at`, `created_at`, `is_active`, `date_used`, `is_used`) VALUES
(3, '123456', 100000, '2024-04-30 00:00:00.000000', '2024-04-14 02:12:05.449211', 1, NULL, 1),
(4, '222222', 110000, '2024-04-30 00:00:00.000000', '2024-04-14 02:44:12.978735', 1, NULL, 1),
(5, '333333', 100000, '2024-04-30 00:00:00.000000', '2024-04-14 02:56:49.550892', 1, NULL, 1),
(6, '8', 70000, '2024-04-30 00:00:00.000000', '2024-04-14 03:09:26.781935', 1, NULL, 1),
(7, '9', 100000, '2024-05-07 00:00:00.000000', '2024-04-14 03:09:38.265764', 1, NULL, 1),
(8, '11', 100000, '2024-04-30 00:00:00.000000', '2024-04-14 03:58:59.500235', 1, NULL, 1),
(9, '12', 100000, '2024-05-01 00:00:00.000000', '2024-04-14 04:01:59.512207', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `revenue_order`
--

CREATE TABLE `revenue_order` (
  `id` bigint(20) NOT NULL,
  `order_code` varchar(100) NOT NULL,
  `product_price` double NOT NULL,
  `base_price` double NOT NULL,
  `tax` double NOT NULL,
  `total_price` double NOT NULL,
  `status` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `device_id_id` bigint(20) NOT NULL,
  `photo_url_done` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `revenue_order`
--

INSERT INTO `revenue_order` (`id`, `order_code`, `product_price`, `base_price`, `tax`, `total_price`, `status`, `created_at`, `updated_at`, `device_id_id`, `photo_url_done`) VALUES
(214, 'j33az7b83k', 100000, 70000, 0, 100000, 'Success', '2024-04-14 02:12:31.802299', '2024-04-14 02:12:31.818917', 1, ''),
(215, '9oo3fahu4r', 110000, 100000, 0, 110000, 'Success', '2024-04-14 02:44:24.555945', '2024-04-14 02:50:12.402081', 1, 'http://res.cloudinary.com/dztfinhqv/image/upload/v1713063011/fbptj05kvxmouergepgc.png'),
(216, 'x9a9kqliw3', 100000, 100000, 0, 100000, 'Success', '2024-04-14 02:56:55.807074', '2024-04-14 02:58:52.870467', 1, 'http://res.cloudinary.com/dztfinhqv/image/upload/v1713063532/exc1gscsiotwwc2w0rmi.png'),
(217, 'ubfdevyj2t', 70000, 100000, 0, 70000, 'Pending', '2024-04-14 03:09:48.147514', '2024-04-14 03:09:48.147514', 1, ''),
(218, '99lc39qgpx', 70000, 100000, 0, 70000, 'Pending', '2024-04-14 03:09:51.330450', '2024-04-14 03:09:51.330450', 1, ''),
(219, 'kz5ziaoise', 70000, 100000, 0, 70000, 'Pending', '2024-04-14 03:10:30.281943', '2024-04-14 03:10:30.281943', 1, ''),
(220, '6bogi5tjhg', 100000, 100000, 0, 100000, 'Success', '2024-04-14 03:10:40.919412', '2024-04-14 03:12:00.944047', 1, 'http://res.cloudinary.com/dztfinhqv/image/upload/v1713064320/amymy98jbjsuw1d4vk5a.png'),
(221, 'acagy49nty', 70000, 70000, 0, 70000, 'Success', '2024-04-14 03:17:35.839026', '2024-04-14 03:21:27.727119', 1, 'http://res.cloudinary.com/dztfinhqv/image/upload/v1713064887/yqsm9havnhcowrb3rdse.png'),
(222, '0t075veirz', 100000, 70000, 0, 100000, 'Success', '2024-04-14 03:59:07.457823', '2024-04-14 03:59:07.475434', 1, ''),
(223, 'u845b9nekw', 100000, 70000, 0, 100000, 'Success', '2024-04-14 04:06:02.633474', '2024-04-14 04:07:18.670042', 1, 'http://res.cloudinary.com/dztfinhqv/image/upload/v1713067638/tok3krwu1k0ddgnllxow.png'),
(224, '240415_1502', 70000, 0, 0, 70000, 'Pending', '2024-04-15 14:32:28.945351', '2024-04-15 14:32:28.945351', 1, ''),
(225, 'stma1f0qoa', 70000, 0, 0, 70000, 'Pending', '2024-04-15 14:34:40.820229', '2024-04-15 14:34:40.820229', 1, ''),
(226, 'xrdo2hgsji', 70000, 0, 0, 70000, 'Pending', '2024-04-15 14:38:04.685929', '2024-04-15 14:38:04.685929', 1, ''),
(227, '240415_951409', 100000, 0, 0, 100000, 'Pending', '2024-04-15 15:17:58.629590', '2024-04-15 15:17:58.629590', 1, ''),
(228, '240415_360459', 100000, 0, 0, 100000, 'Pending', '2024-04-15 15:18:01.733310', '2024-04-15 15:18:01.733310', 1, ''),
(229, 'st2u7r84co', 100000, 0, 0, 100000, 'Pending', '2024-04-15 15:18:03.914273', '2024-04-15 15:18:03.914273', 1, ''),
(230, '240415_226513', 100000, 0, 0, 100000, 'Success', '2024-04-15 15:19:03.916751', '2024-04-15 15:19:12.065237', 1, '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `revenue_transaction`
--

CREATE TABLE `revenue_transaction` (
  `id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `transaction_status` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `order_id_id` bigint(20) NOT NULL,
  `payment_id_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `revenue_transaction`
--

INSERT INTO `revenue_transaction` (`id`, `amount`, `transaction_status`, `created_at`, `updated_at`, `order_id_id`, `payment_id_id`) VALUES
(62, 70000, 'Success', '2024-04-14 02:12:31.810636', '2024-04-14 02:12:31.810636', 214, 3),
(63, 100000, 'Success', '2024-04-14 02:44:24.558544', '2024-04-14 02:44:24.558544', 215, 3),
(64, 100000, 'Success', '2024-04-14 02:56:55.816808', '2024-04-14 02:56:55.816808', 216, 3),
(65, 100000, 'Success', '2024-04-14 03:10:40.925531', '2024-04-14 03:10:40.925531', 220, 3),
(66, 70000, 'Success', '2024-04-14 03:17:35.849884', '2024-04-14 03:17:35.849884', 221, 3),
(67, 70000, 'Success', '2024-04-14 03:59:07.465747', '2024-04-14 03:59:07.465747', 222, 3),
(68, 70000, 'Success', '2024-04-14 04:06:02.639098', '2024-04-14 04:06:02.639098', 223, 3),
(69, 100000, 'Success', '2024-04-15 15:19:12.070796', '2024-04-15 15:19:12.070796', 230, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sticker_sticker`
--

CREATE TABLE `sticker_sticker` (
  `id` bigint(20) NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sticker_sticker`
--

INSERT INTO `sticker_sticker` (`id`, `category`, `title`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'MOOD', 'Did My Best', 'stickers/mood-01.png', '2024-04-05 09:41:35.990631', '2024-04-05 09:41:35.990631'),
(2, 'MOOD', 'Smile More', 'stickers/mood-02.png', '2024-04-05 09:41:51.010814', '2024-04-05 09:41:51.010814'),
(3, 'MOOD', 'Send Love', 'stickers/mood-03.png', '2024-04-05 09:42:01.412376', '2024-04-05 09:42:01.412376'),
(4, 'MOOD', 'Ok', 'stickers/mood-04.png', '2024-04-05 09:42:11.945844', '2024-04-05 09:42:11.945844'),
(5, 'MOOD', 'Victory', 'stickers/mood-05.png', '2024-04-05 09:42:22.800646', '2024-04-05 09:42:22.800646'),
(6, 'MOOD', 'High Five', 'stickers/mood-06.png', '2024-04-05 09:43:12.277448', '2024-04-05 09:43:12.277448'),
(7, 'MOOD', 'You Did Great', 'stickers/mood-07.png', '2024-04-05 09:43:34.366542', '2024-04-05 09:43:34.366542'),
(8, 'MOOD', 'Cloud', 'stickers/mood-08.png', '2024-04-05 09:44:50.770895', '2024-04-05 09:44:50.770895'),
(9, 'MOOD', 'Ban Tim', 'stickers/mood-09.png', '2024-04-05 09:45:07.002593', '2024-04-05 09:45:07.002593'),
(10, 'MOOD', 'Heart', 'stickers/mood-10.png', '2024-04-05 09:45:17.632135', '2024-04-05 09:45:17.632135'),
(11, 'MOOD', 'Give Heart', 'stickers/mood-11.png', '2024-04-05 09:45:36.886113', '2024-04-05 09:45:36.886113'),
(12, 'MOOD', 'Send Heart', 'stickers/mood-12.png', '2024-04-05 09:45:48.180141', '2024-04-05 09:45:48.180141'),
(13, 'MOOD', 'Love Mail', 'stickers/mood-13.png', '2024-04-05 09:45:57.854973', '2024-04-05 09:45:57.854973'),
(14, 'MOOD', 'Smily', 'stickers/mood-14.png', '2024-04-05 09:46:08.640370', '2024-04-05 09:46:08.640370'),
(15, 'MOOD', 'Star Face', 'stickers/mood-15.png', '2024-04-05 09:46:18.247655', '2024-04-05 09:46:18.247655'),
(16, 'MOOD', 'Blue Heart', 'stickers/mood-16.png', '2024-04-05 09:46:33.440429', '2024-04-05 09:46:33.440429'),
(17, 'MOOD', 'Play Game', 'stickers/mood-17.png', '2024-04-05 09:46:44.311775', '2024-04-05 09:46:44.311775'),
(18, 'MOOD', 'Lightning', 'stickers/mood-18.png', '2024-04-05 09:47:03.160824', '2024-04-05 09:47:03.160824'),
(19, 'MOOD', 'Rainbow', 'stickers/mood-19.png', '2024-04-05 09:47:11.569475', '2024-04-05 09:47:11.569475'),
(20, 'MOOD', 'Sun', 'stickers/mood-20.png', '2024-04-05 09:47:18.948172', '2024-04-05 09:47:18.948172');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `store_store`
--

CREATE TABLE `store_store` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `store_store`
--

INSERT INTO `store_store` (`id`, `name`, `address`, `created_at`, `updated_at`) VALUES
(1, '123', '123 Test, HCM, Viet Nam', '2024-03-30 03:42:22.240594', '2024-04-18 04:35:45.180790');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account_account`
--
ALTER TABLE `account_account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Chỉ mục cho bảng `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Chỉ mục cho bảng `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Chỉ mục cho bảng `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Chỉ mục cho bảng `background_background`
--
ALTER TABLE `background_background`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `device_device`
--
ALTER TABLE `device_device`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_device_store_id_id_006e4721_fk_store_store_id` (`store_id_id`),
  ADD KEY `device_device_user_id_f5cc8c87_fk_auth_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Chỉ mục cho bảng `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Chỉ mục cho bảng `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Chỉ mục cho bảng `filter_filter`
--
ALTER TABLE `filter_filter`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `frame_cloudphoto`
--
ALTER TABLE `frame_cloudphoto`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `frame_frame`
--
ALTER TABLE `frame_frame`
  ADD PRIMARY KEY (`id`),
  ADD KEY `frame_frame_device_id_id_6d2577db_fk_device_device_id` (`device_id_id`);

--
-- Chỉ mục cho bảng `layout_layout`
--
ALTER TABLE `layout_layout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `layout_layout_frame_id_24f46f3c_fk_frame_frame_id` (`frame_id`),
  ADD KEY `layout_layout_background_id_9e839ebc_fk_background_background_id` (`background_id`);

--
-- Chỉ mục cho bảng `payment_payment`
--
ALTER TABLE `payment_payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`) USING HASH;

--
-- Chỉ mục cho bảng `redeem_redeem`
--
ALTER TABLE `redeem_redeem`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `revenue_order`
--
ALTER TABLE `revenue_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `revenue_order_device_id_id_faf433a9_fk_device_device_id` (`device_id_id`);

--
-- Chỉ mục cho bảng `revenue_transaction`
--
ALTER TABLE `revenue_transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `revenue_transaction_order_id_id_db8bafb0_fk_revenue_order_id` (`order_id_id`),
  ADD KEY `revenue_transaction_payment_id_id_dfb6cabc_fk_payment_payment_id` (`payment_id_id`);

--
-- Chỉ mục cho bảng `sticker_sticker`
--
ALTER TABLE `sticker_sticker`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `store_store`
--
ALTER TABLE `store_store`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account_account`
--
ALTER TABLE `account_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT cho bảng `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `background_background`
--
ALTER TABLE `background_background`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `device_device`
--
ALTER TABLE `device_device`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `filter_filter`
--
ALTER TABLE `filter_filter`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `frame_cloudphoto`
--
ALTER TABLE `frame_cloudphoto`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `frame_frame`
--
ALTER TABLE `frame_frame`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `layout_layout`
--
ALTER TABLE `layout_layout`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT cho bảng `payment_payment`
--
ALTER TABLE `payment_payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `redeem_redeem`
--
ALTER TABLE `redeem_redeem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `revenue_order`
--
ALTER TABLE `revenue_order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT cho bảng `revenue_transaction`
--
ALTER TABLE `revenue_transaction`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT cho bảng `sticker_sticker`
--
ALTER TABLE `sticker_sticker`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `store_store`
--
ALTER TABLE `store_store`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Các ràng buộc cho bảng `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Các ràng buộc cho bảng `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Các ràng buộc cho bảng `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Các ràng buộc cho bảng `device_device`
--
ALTER TABLE `device_device`
  ADD CONSTRAINT `device_device_store_id_id_006e4721_fk_store_store_id` FOREIGN KEY (`store_id_id`) REFERENCES `store_store` (`id`),
  ADD CONSTRAINT `device_device_user_id_f5cc8c87_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Các ràng buộc cho bảng `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Các ràng buộc cho bảng `frame_frame`
--
ALTER TABLE `frame_frame`
  ADD CONSTRAINT `frame_frame_device_id_id_6d2577db_fk_device_device_id` FOREIGN KEY (`device_id_id`) REFERENCES `device_device` (`id`);

--
-- Các ràng buộc cho bảng `layout_layout`
--
ALTER TABLE `layout_layout`
  ADD CONSTRAINT `layout_layout_background_id_9e839ebc_fk_background_background_id` FOREIGN KEY (`background_id`) REFERENCES `background_background` (`id`),
  ADD CONSTRAINT `layout_layout_frame_id_24f46f3c_fk_frame_frame_id` FOREIGN KEY (`frame_id`) REFERENCES `frame_frame` (`id`);

--
-- Các ràng buộc cho bảng `revenue_order`
--
ALTER TABLE `revenue_order`
  ADD CONSTRAINT `revenue_order_device_id_id_faf433a9_fk_device_device_id` FOREIGN KEY (`device_id_id`) REFERENCES `device_device` (`id`);

--
-- Các ràng buộc cho bảng `revenue_transaction`
--
ALTER TABLE `revenue_transaction`
  ADD CONSTRAINT `revenue_transaction_order_id_id_db8bafb0_fk_revenue_order_id` FOREIGN KEY (`order_id_id`) REFERENCES `revenue_order` (`id`),
  ADD CONSTRAINT `revenue_transaction_payment_id_id_dfb6cabc_fk_payment_payment_id` FOREIGN KEY (`payment_id_id`) REFERENCES `payment_payment` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
