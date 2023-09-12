import {onBeforeUnmount} from 'vue';
import { Toast } from 'vant';

export function useLoading() {
  let toast=null;
  const startLoading=()=>{
    toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: "加载中..."
    })
  }
  const stopLoading = () => {
    toast && toast.clear();
  };

  onBeforeUnmount(stopLoading);

  return{
    startLoading,
    stopLoading
  }
}
