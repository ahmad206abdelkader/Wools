import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "@/components/Input";
import Modal from "@/components/Modal";




const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
          return;
        }
    
        registerModal.onOpen();
        loginModal.onClose();
      }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true);

            await signIn('credentials', {
              email,
              password
            })
            
            loginModal.onClose();
        } catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    },[loginModal, email, password]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
             placeholder="Email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             disabled={isLoading}
            />
            <Input
             placeholder="Password"
             type="password"
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="mt-3 text-center text-sm text-[#8b98a5]">
          <p className="flex flex-wrap justify-center gap-1.5">
            <span>First time using Wools?</span>
            <button
            type="button"
            onClick={onToggle}
            className="cursor-pointer font-semibold text-sky-400 hover:underline">
              Create an account
            </button>
          </p>
        </div>
      );

  return (
    <Modal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Welcome back"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
