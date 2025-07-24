import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';

export class Toast {
  static success(message: string) {
    toast.success(message, {
      transition: Bounce,
    });
  }

  static error(message: string) {
    toast.error(message, {
      transition: Bounce,
    });
  }
}
