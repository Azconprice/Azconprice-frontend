import React, { useState } from 'react';
import BaseModal, { modalInputStyles, modalButtonStyles, modalErrorStyles } from '../BaseModal';
import viewIcon from "@/assets/icons/view.png";
import hideIcon from "@/assets/icons/hide.png";

const MasterRegistrationStepFour = ({ isOpen, onClose, onBack, onNext, initialData, isLoading }) => {
    const [email, setEmail] = useState(initialData?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        return requirements;
    };

    const passwordRequirements = validatePassword(password);

    const handleSubmit = () => {
        if (!email || !password || !confirmPassword) {
            setError('Bütün xanaları doldurun');
            return;
        }

        if (!passwordRequirements.length) {
            setError('Şifrə ən az 8 simvol olmalıdır');
            return;
        }

        if (!passwordRequirements.uppercase) {
            setError('Şifrədə ən az 1 böyük hərf (A-Z) olmalıdır');
            return;
        }

        if (!passwordRequirements.lowercase) {
            setError('Şifrədə ən az 1 kiçik hərf (a-z) olmalıdır');
            return;
        }

        if (!passwordRequirements.number) {
            setError('Şifrədə ən az 1 rəqəm (0-9) olmalıdır');
            return;
        }

        if (!passwordRequirements.special) {
            setError('Şifrədə ən az 1 xüsusi simvol (!@#$%^&*) olmalıdır');
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifrələr uyğun gəlmir');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin');
            return;
        }

        setError('');
        onNext({
            email,
            password,
            confirmPassword
        });
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            onBack={onBack}
            showBackButton={true}
            className="overflow-y-visible"
            title="Qeydiyyat"
            subtitle="Usta"
        >
            <div className="mb-[10px] w-full">
                <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <img src="/assets/icons/email.svg" alt="icon" className="w-[16px] h-[16px]" />
                    </span>
                    <input
                        type="email"
                        placeholder="E-poçt ünvanı"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
                        required
                    />
                </div>
                <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <img src="/assets/icons/passwordicon.svg" alt="icon" className="w-[16px] h-[16px]" />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrə"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
                        required
                    />
                    <span
                        className="absolute right-4  top-[20px] -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <img
                            src={showPassword ? viewIcon.src : hideIcon.src}
                            alt={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                            className="w-5 h-5"
                        />
                    </span>
                </div>

                {password && (
                    <div className="mb-4 text-xs space-y-1">
                        <div className={`flex items-center space-x-2 ${passwordRequirements.length ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{passwordRequirements.length ? '✓' : '✗'}</span>
                            <span>Ən az 8 simvol</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${passwordRequirements.uppercase ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{passwordRequirements.uppercase ? '✓' : '✗'}</span>
                            <span>Böyük hərf (A-Z)</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${passwordRequirements.lowercase ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{passwordRequirements.lowercase ? '✓' : '✗'}</span>
                            <span>Kiçik hərf (a-z)</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${passwordRequirements.number ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{passwordRequirements.number ? '✓' : '✗'}</span>
                            <span>Rəqəm (0-9)</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${passwordRequirements.special ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{passwordRequirements.special ? '✓' : '✗'}</span>
                            <span>Xüsusi simvol (!@#$%^&*)</span>
                        </div>
                    </div>
                )}

                <div className="relative mb-4">
                    <span className="absolute left-4  top-[20px] -translate-y-1/2 text-gray-400">
                        <img src="/assets/icons/passwordicon.svg" alt="icon" className="w-[16px] h-[16px]" />
                    </span>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Şifrəni təkrarlayın"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded-full bg-[#F3F3F3] text-gray-500 placeholder-gray-400 focus:outline-none"
                        required
                    />
                    <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                        <img
                            src={showConfirmPassword ? viewIcon.src : hideIcon.src}
                            alt={showConfirmPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                            className="w-5 h-5"
                        />
                    </span>
                </div>
            </div>
            {error && <div className={modalErrorStyles}>{error}</div>}
            <button
                className={modalButtonStyles}
                onClick={handleSubmit}
            >
                {isLoading ? <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div> : 'Davam et'}
            </button>
        </BaseModal>
    );
};

export default MasterRegistrationStepFour;


