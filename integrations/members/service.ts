import { Member } from ".";
import { storageService } from "@/services/storage";

export const getCurrentMember = async (): Promise<Member | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return mock user from storage
  return storageService.getUser() as unknown as Member;
};
