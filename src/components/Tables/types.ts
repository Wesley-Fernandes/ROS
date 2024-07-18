import { ToastActionElement, ToastProps } from '@/components/ui/toast';

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export type Toast = Omit<ToasterToast, 'id'>;

export type SituationType  = 
| 'Teste Técnico'
| 'Rejeitado'
| 'Aprovado'
| 'Oferta'
| 'Contratado'
| 'Pendente'
| 'Cancelado'
| 'Entrevista RH'
| 'Entrevista Tecnica';
export interface Recruitment {
  id: string;
  createdAt: string; //iso8601
  updatedAt: string; //iso8601;
  enterprise: string;
  job: string;
  href: string;
  situation: SituationType;
}

export interface FilterProps {
  toast: ({ ...props }: Toast) => void;
  data: Recruitment[];
}
