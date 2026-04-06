export type ApiOutlet = {
  id: number;
  name: string;
  address?: string | null;
  phone?: string | null;
  code?: string;
  outlettype?: string;
  isactive?: boolean;
  createdat?: string;
  latitude?: number | null;
  longitude?: number | null;
  bannerimage?: string | null;
  orgid?: number;
  org_name?: string;
  branch_id?: number | null;
  branch_name?: string | null;
  branch_address?: string | null;
  branch_phone?: string | null;
};

export type ApiBranch = {
  id: number;
  name: string;
  address?: string | null;
  phone?: string | null;
  isactive?: boolean;
  createdat?: string;
  locationid?: number | null;
  orgid?: number;
  org_name?: string;
  outlets?: ApiOutlet[];
};

export type ApiOrganization = {
  id: number;
  name: string;
  createdat?: string;
  branches?: ApiBranch[];
  total_branches?: number;
  total_outlets?: number;
};