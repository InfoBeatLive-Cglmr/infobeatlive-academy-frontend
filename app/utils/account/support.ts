// ChatService.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./auth";
import { BASE_URL } from "./auth";
import io, { Socket } from "socket.io-client";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error("Error retrieving access token:", error);
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

export type ChatMessageType =
  | "TEXT"
  | "IMAGE"
  | "VIDEO"
  | "AUDIO"
  | "DOCUMENT"
  | "RECORDING";

export interface ChatMessage {
  id: string;
  ticketId: string;
  companyId: string;
  content: string;
  type: ChatMessageType;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isRead: boolean;
  company?: any;
}

export interface CreateChatRequest {
  content?: string;
  type: ChatMessageType;
  file?: File;
}

export interface ChatListResponse {
  success: boolean;
  data: ChatMessage[];
  message?: string;
}

export interface SingleChatResponse {
  success: boolean;
  data: ChatMessage;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const supportChats = {
  createChats: async (
    ticketId: string,
    companyId: string,
    data: CreateChatRequest
  ): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("type", data.type);
    if (data.content) {
      formData.append("content", data.content);
    }
    if (data.file) {
      formData.append("file", data.file);
    }

    const response = await api.post<ApiResponse>(
      `/account/support/create/${ticketId}/${companyId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  getChats: async (
    ticketId: string,
    offset: number = 0,
    limit: number = 20
  ): Promise<ChatListResponse> => {
    const response = await api.get<ChatListResponse>(
      `/account/support/get/${ticketId}`,
      { params: { offset, limit } }
    );
    return response.data;
  },

  getChatsById: async (
    ticketId: string,
    id: string
  ): Promise<SingleChatResponse> => {
    const response = await api.get<SingleChatResponse>(
      `/account/support/get/${ticketId}/${id}`
    );
    return response.data;
  },

  updateChats: async (
    ticketId: string,
    id: string,
    content: string
  ): Promise<SingleChatResponse> => {
    const response = await api.put<SingleChatResponse>(
      `/account/support/update/${ticketId}/${id}`,
      { content }
    );
    return response.data;
  },

  deleteChats: async (
    ticketId: string,
    id: string
  ): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(
      `/account/support/delete/${ticketId}/${id}`
    );
    return response.data;
  },
};

export const initChatSocket = (): Socket => {
  const socket = io(BASE_URL, {
    transports: ["websocket"],
    reconnection: true,
  });
  socket.on("connect", () => alert("✅ Socket connected:"));
  socket.on("disconnect", () => alert("❌ Socket disconnected"));
  return socket;
};