USE [master]
GO
/****** Object:  Database [SourceData]    Script Date: 26/05/2019 01:56:54 ******/
CREATE DATABASE [SourceData]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SourceData', FILENAME = N'C:\Users\User\SourceData.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SourceData_log', FILENAME = N'C:\Users\User\SourceData_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SourceData] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))+
begin
EXEC [SourceData].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SourceData] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SourceData] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SourceData] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SourceData] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SourceData] SET ARITHABORT OFF 
GO
ALTER DATABASE [SourceData] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SourceData] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SourceData] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SourceData] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SourceData] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SourceData] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SourceData] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SourceData] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SourceData] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SourceData] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SourceData] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SourceData] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SourceData] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SourceData] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SourceData] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SourceData] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SourceData] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SourceData] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SourceData] SET  MULTI_USER 
GO
ALTER DATABASE [SourceData] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SourceData] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SourceData] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SourceData] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SourceData] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SourceData] SET QUERY_STORE = OFF
GO
USE [SourceData]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [SourceData]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[categoryName] [nvarchar](50) NULL,
	[parentCategory] [int] NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[permissionsCode] [int] IDENTITY(1,1) NOT NULL,
	[permissionsType] [varchar](50) NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[permissionsCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResourceCategory]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResourceCategory](
	[resourceCode] [int] NOT NULL,
	[categoryCode] [int] NOT NULL,
 CONSTRAINT [PK_ResourceCategory] PRIMARY KEY CLUSTERED 
(
	[resourceCode] ASC,
	[categoryCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResourcePermission]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResourcePermission](
	[ResouceCode] [int] NOT NULL,
	[PermissionCode] [int] NOT NULL,
 CONSTRAINT [PK_ResourcePermission_1] PRIMARY KEY CLUSTERED 
(
	[ResouceCode] ASC,
	[PermissionCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Resources]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Resources](
	[resourceCode] [int] IDENTITY(1,1) NOT NULL,
	[resourceName] [varchar](50) NULL,
	[filePath] [text] NULL,
	[version] [varchar](50) NULL,
	[authorName] [varchar](50) NULL,
	[date] [date] NULL,
	[sizeB] [numeric](18, 0) NULL,
	[numPage] [numeric](18, 0) NULL,
	[type] [varchar](200) NULL,
 CONSTRAINT [PK_Resources] PRIMARY KEY CLUSTERED 
(
	[resourceCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[roleCode] [int] IDENTITY(1,1) NOT NULL,
	[roleType] [nvarchar](50) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[roleCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolesPremmision]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolesPremmision](
	[premmisionId] [int] NOT NULL,
	[roleId] [int] NOT NULL,
 CONSTRAINT [PK_RolesPremmision] PRIMARY KEY CLUSTERED 
(
	[premmisionId] ASC,
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 26/05/2019 01:56:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userCode] [int] IDENTITY(1,1) NOT NULL,
	[userName] [varchar](50) NULL,
	[password] [varchar](50) NULL,
	[email] [varchar](50) NULL,
	[roleCode] [int] NULL,
	[year] [date] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[userCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categories] ON 
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (1, N'חגים', NULL)
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (2, N'פסח', 1)
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (3, N'שבועות', 1)
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (4, N'עונות השנה', NULL)
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (5, N'אביב', 4)
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (6, N'קיץ', 4)
GO
INSERT [dbo].[Categories] ([CategoryId], [categoryName], [parentCategory]) VALUES (7, N'ירושלים', NULL)
GO
SET IDENTITY_INSERT [dbo].[Categories] OFF
GO
SET IDENTITY_INSERT [dbo].[Permissions] ON 
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (3, N'הרשאת צפיה')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (4, N'הרשאת עריכה')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (5, N'הרשאת הדפסה')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (6, N'העלאת קובץ')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (7, N'הרשאת מחיקה')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (8, N'הרשאת עריכה')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (1009, N'הוספת משתמשים')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2009, N'הרשאות')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2010, N'עדכון הרשאות')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2011, N'הוספת הרשאות')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2012, N'העלאת קובץ')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2013, N'צפיה במשתמשים')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2014, N'עדכון קובץ')
GO
INSERT [dbo].[Permissions] ([permissionsCode], [permissionsType]) VALUES (2015, N'מחיקת קובץ')
GO
SET IDENTITY_INSERT [dbo].[Permissions] OFF
GO
INSERT [dbo].[ResourceCategory] ([resourceCode], [categoryCode]) VALUES (4017, 1)
GO
INSERT [dbo].[ResourceCategory] ([resourceCode], [categoryCode]) VALUES (4017, 2)
GO
INSERT [dbo].[ResourcePermission] ([ResouceCode], [PermissionCode]) VALUES (4017, 3)
GO
INSERT [dbo].[ResourcePermission] ([ResouceCode], [PermissionCode]) VALUES (4017, 4)
GO
INSERT [dbo].[ResourcePermission] ([ResouceCode], [PermissionCode]) VALUES (4017, 5)
GO
SET IDENTITY_INSERT [dbo].[Resources] ON 
GO
INSERT [dbo].[Resources] ([resourceCode], [resourceName], [filePath], [version], [authorName], [date], [sizeB], [numPage], [type]) VALUES (4017, N'pdfDocument.pdf', N'C:\Users\User\Documents\sourceFile\Files\pdfDocument.pdf', NULL, N'chaya', CAST(N'2019-05-08' AS Date), CAST(426005 AS Numeric(18, 0)), NULL, N'application/pdf')
GO
SET IDENTITY_INSERT [dbo].[Resources] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 
GO
INSERT [dbo].[Role] ([roleCode], [roleType]) VALUES (1, N'מנהלת')
GO
INSERT [dbo].[Role] ([roleCode], [roleType]) VALUES (2, N'מזכירה')
GO
INSERT [dbo].[Role] ([roleCode], [roleType]) VALUES (3, N'תלמידה כיתה ח')
GO
INSERT [dbo].[Role] ([roleCode], [roleType]) VALUES (4, N'תלמידה כיתה א')
GO
INSERT [dbo].[Role] ([roleCode], [roleType]) VALUES (5, N'תלמידה')
GO
INSERT [dbo].[Role] ([roleCode], [roleType]) VALUES (1002, N'מזכירה')
GO
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (3, 1)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (3, 2)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (3, 3)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (4, 1)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (4, 2)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (5, 1)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (5, 2)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (5, 3)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (6, 1)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (6, 2)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (7, 1)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (7, 2)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (8, 1)
GO
INSERT [dbo].[RolesPremmision] ([premmisionId], [roleId]) VALUES (8, 2)
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (3, N'chaya axstock', N'123456789', N'c0556777462@gmail.com', 1002, CAST(N'2019-05-11' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (5, N'sara alevi', N'78965412', N'c0556777462@gmail.com', 4, CAST(N'2019-05-12' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (6, N'sara levi', N'456789', N'c0556777462@gmail.com', 3, CAST(N'2019-05-12' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (8, N'הודיה', N'987987', N'c0556777462@gmail.com', 1, CAST(N'2019-05-18' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (10, N'שרה חיה', N'565656', N'c0556777462@gmail.com', 4, CAST(N'2019-05-18' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (11, N'chaya', N'123456', N'c0556777462@gmail.com', 1, CAST(N'2019-05-18' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (12, N'טובה', N'7878', N'c0556777462@gmail.com', 4, CAST(N'2019-05-21' AS Date))
GO
INSERT [dbo].[Users] ([userCode], [userName], [password], [email], [roleCode], [year]) VALUES (13, N'777', N'777', N'c0556777462@gmail.com', 1002, CAST(N'2019-05-21' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[ResourceCategory]  WITH CHECK ADD  CONSTRAINT [FK_ResourceCategory_Resources] FOREIGN KEY([categoryCode])
REFERENCES [dbo].[Categories] ([CategoryId])
GO
ALTER TABLE [dbo].[ResourceCategory] CHECK CONSTRAINT [FK_ResourceCategory_Resources]
GO
ALTER TABLE [dbo].[ResourceCategory]  WITH CHECK ADD  CONSTRAINT [FK_ResourceCategory_Resources1] FOREIGN KEY([resourceCode])
REFERENCES [dbo].[Resources] ([resourceCode])
GO
ALTER TABLE [dbo].[ResourceCategory] CHECK CONSTRAINT [FK_ResourceCategory_Resources1]
GO
ALTER TABLE [dbo].[ResourcePermission]  WITH CHECK ADD  CONSTRAINT [FK_ResourcePermission_Permissions] FOREIGN KEY([PermissionCode])
REFERENCES [dbo].[Permissions] ([permissionsCode])
GO
ALTER TABLE [dbo].[ResourcePermission] CHECK CONSTRAINT [FK_ResourcePermission_Permissions]
GO
ALTER TABLE [dbo].[ResourcePermission]  WITH CHECK ADD  CONSTRAINT [FK_ResourcePermission_Resources] FOREIGN KEY([ResouceCode])
REFERENCES [dbo].[Resources] ([resourceCode])
GO
ALTER TABLE [dbo].[ResourcePermission] CHECK CONSTRAINT [FK_ResourcePermission_Resources]
GO
ALTER TABLE [dbo].[RolesPremmision]  WITH CHECK ADD  CONSTRAINT [FK_RolesPremmision_Permissions] FOREIGN KEY([premmisionId])
REFERENCES [dbo].[Permissions] ([permissionsCode])
GO
ALTER TABLE [dbo].[RolesPremmision] CHECK CONSTRAINT [FK_RolesPremmision_Permissions]
GO
ALTER TABLE [dbo].[RolesPremmision]  WITH CHECK ADD  CONSTRAINT [FK_RolesPremmision_Role] FOREIGN KEY([roleId])
REFERENCES [dbo].[Role] ([roleCode])
GO
ALTER TABLE [dbo].[RolesPremmision] CHECK CONSTRAINT [FK_RolesPremmision_Role]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Role] FOREIGN KEY([roleCode])
REFERENCES [dbo].[Role] ([roleCode])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Role]
GO
USE [master]
GO
ALTER DATABASE [SourceData] SET  READ_WRITE 
GO
