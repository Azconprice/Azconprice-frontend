'use client'

const ModalWrapper = ({children}) => {
    return (
     <div className="flex justify-center items-center h-screen w-full fixed inset-0 z-100 backdrop-blur-lg">
        {children}
     </div>
    )
}

export default ModalWrapper;
