import React, { useState } from 'react'
import NormalUserRegistrationStepOne from './NormalUserRegistrationStepOne'
import NormalUserRegistrationStepTwo from './NormalUserRegistrationStepTwo'

const NormalUserModals = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const handleStepData = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }))
  }

  const handleNext = (stepData) => {
    handleStepData(stepData)
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (finalData) => {
    try {
      const completeData = {
        ...formData,
        ...finalData
      }
      
      // TODO: Implement your API call here
      console.log('Submitting normal user data:', completeData)
      
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {currentStep === 1 && (
        <NormalUserRegistrationStepOne 
          onNext={handleNext}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 2 && (
        <NormalUserRegistrationStepTwo 
          onNext={handleSubmit}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  )
}

export default NormalUserModals