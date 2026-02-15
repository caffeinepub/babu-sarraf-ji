import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface PostView {
    id: bigint;
    likedBy: Array<Principal>;
    author: Principal;
    likes: bigint;
    timestamp: Time;
    caption: string;
    image: ExternalBlob;
    comments: Array<CommentView>;
}
export interface ChatMessageView {
    id: bigint;
    content: string;
    author: Principal;
    timestamp: Time;
}
export interface CommentView {
    id: bigint;
    content: string;
    author: Principal;
    timestamp: Time;
}
export interface UserProfile {
    displayName: string;
}
export interface TestResult {
    exam: string;
    score: bigint;
    totalQuestions: bigint;
    incorrectCount: bigint;
    timestamp: Time;
    category: string;
    correctCount: bigint;
    accuracy: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComment(postId: bigint, content: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    blockUser(user: Principal): Promise<void>;
    clearDashboardBackground(): Promise<void>;
    createPost(image: ExternalBlob, caption: string): Promise<bigint>;
    deleteChatMessage(messageId: bigint): Promise<void>;
    deleteComment(postId: bigint, commentId: bigint): Promise<void>;
    deletePost(postId: bigint): Promise<void>;
    getAllPosts(): Promise<Array<PostView>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatMessages(): Promise<Array<ChatMessageView>>;
    getComments(postId: bigint): Promise<Array<CommentView>>;
    getDashboardBackground(): Promise<ExternalBlob | null>;
    getTestHistory(): Promise<Array<TestResult>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    likePost(postId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveDashboardBackground(image: ExternalBlob): Promise<void>;
    saveTestResult(result: TestResult): Promise<void>;
    sendMessage(content: string): Promise<bigint>;
    unblockUser(user: Principal): Promise<void>;
}
