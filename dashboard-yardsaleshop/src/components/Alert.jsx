import { XCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@hooks/useAuth';

const Alert = () => {
  const { alert, toogleAlert }= useAuth();
  if (alert && alert?.autoClose) {
    setTimeout(() => {
      toogleAlert();
    }, 20000);
  }
  
  const styles = {
    container: "mx-4 p-5 rounded mb-8  lg:ml-auto lg:w-1/2 ",
    text: "flex-1 leading-tight text-sm font-bold ",
    icon: "w-6 h-6 "
  }

  switch (alert.type) {
    case 'error':
      styles.container += "bg-red-100"; 
      styles.text += "text-red-800"; 
      styles.icon += "text-red-500";
      styles.emoji = "❌  " 
      break;
    case 'success-added':
      styles.container += "bg-lime-100"; 
      styles.text += "text-green-700"; 
      styles.icon += "text-green-500"; 
      styles.emoji = "➕  " 
      break;
    case 'success-deleted':
      styles.container += "bg-purple-100"; 
      styles.text += "text-purple-700"; 
      styles.icon += "text-purple-500"; 
      styles.emoji = "🗑️  " 
      break;
    case 'success-edited':
      styles.container += "bg-amber-100"; 
      styles.text += "text-orange-600"; 
      styles.icon += "text-amber-500"; 
      styles.emoji = "✅  " 
      break;
    default: 
      styles.container += "bg-indigo-100"; 
      styles.text += "text-black"; 
      styles.icon += "text-gray-600"; 
  }
  

  return (
    <>
      {alert?.active && (
        <div x-data="{}" className={styles.container}>
          <div className="flex space-x-3">
            <div className={styles.text}>{styles.emoji}{alert.message}</div>
            <button type="button">
              <XCircleIcon className={styles.icon} onClick={toogleAlert} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;