import { User } from "../../../contexts/UserContext";

/**
 * Extended user interface with additional user details
 */
export interface UserDetails extends User {
  section?: string;
  lastActivity?: string;
  totalActivity?: number;
}
