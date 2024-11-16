

export interface Offer {
      id : string ;
      title: string;
      company: {
        name: string;
        logo: string;
        location: string;
      };
      description: string;
      job_level: string;
      contract_type: string;
      wilaya: string;
      daira: string;
}

export interface Diplome{
  id : string;
  degree : string;
  establishment : string;
  start_date : string;
  end_date : string;
}

export interface Experience{
  id : string;
  title :string;
  company : string;
  start_date : string;
  end_date : string;

}

export interface Language{
  label : string;
  level : string;
}

export interface OfferById {
  title: string;
  start_date: string;
  end_date: string;
  company: {
    name: string;
    logo: string;
    socials: Array<{
      label: string;
      url: string;
    }>;
    contacts: Array<{
      type: string;
      info: string;
    }>;
  };
  candidates: number;
  salary: number;
  contract_type: string; 
  job_level: string;
  localisation: string;
  daira:string;
  wilaya:string;
  qualifications: Array<{
    description: string;
  }>;
  responsibilities: Array<{
    description: string;
  }>;
  skills: Array<{
    label: string;
  }>;
}



export interface Filter {
  wilaya?: string | null;
  job_level?: string;
  contract_type?: string;
  salary_min? : number ;
  salary_max? : number ;
  last_n_days?: number ; 
  search?: string;
  
}


interface ApplicationStatus {
  id: number;
  name: string;
  is_default: boolean;
  privileged: boolean;
  color: string;
}

interface OfferForApplication {
  id: string; // Assuming UUID is a string
  title: string;
  wilaya: string | null; // Assuming wilaya can be null
  daira: string | null; // Assuming daira can be null
  description: string;
  job_level: string;
  contract_type: string;
  company_name? : string;
}

export interface Appllication {
  id: number;
  status: ApplicationStatus;
  offer: OfferForApplication;
  employe: string; // Assuming employe is a string (likely UUID)
}

export interface Skill{
  id : string;
  label : string;
}

export interface Hobby{
  id : string;
  label : string;
}

export interface Language{
  id:string;
  label : string;
  level : string;
}