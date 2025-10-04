// src/admin/dto/admin-user-by-id.dto.ts

export interface AdminAlbumSummaryDto {
  id: string;
  title: string;
  description?: string;
  totalOrders: number;
  coverUrl?: string; // 👈 portada del álbum (urlWeb de la primera foto)
}

export interface AdminPhotographerByIdDto {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  isActive: boolean;
  totalOrders: number;
  pendingOrders: number;
  approvedOrders: number;
  rejectedOrders: number;
  albums: AdminAlbumSummaryDto[];
}
