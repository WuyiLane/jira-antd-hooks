export interface Project {
  id: number;
  name: string;
  pin: boolean;
  personId: number | undefined;
  ths: string;
  strings: string;
  caters: string;
  created: string;
  organization: string;
  keg: string;
}

export type ProjectType = {
  id: number;
  name: string;
  pin: boolean;
  personId: number | undefined;
  ths: string;
  strings: string;
  caters: string;
  created: string;
  organization: string;
  keg: string;
};
export type ProjectTasks = {
  id: number;
  name: string;
  pin: boolean;
  personId: number | undefined;
  projectId: number;
  ths: string;
  strings: string;
  caters: string;
  created: string;
  kanbanId: number;
  organization: string;
  keg: string;
};
