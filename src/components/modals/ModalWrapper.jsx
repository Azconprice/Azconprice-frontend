'use client'

const ModalWrapper = ({ children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center w-full h-screen z-100 backdrop-blur-lg">
            {children}
        </div>
    )
}

export default ModalWrapper;
