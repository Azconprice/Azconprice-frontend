import React, { useState } from 'react'
import MasterRegistrationStepOne from './MasterRegistrationStepOne'
import MasterRegistrationStepTwo from './MasterRegistrationStepTwo'
import MasterRegistrationStepThree from './MasterRegistrationStepThree'

const MasterModals = ({ isOpen, onClose, onSuccess }) => {
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
      console.log('Submitting master data:', completeData)
      
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {currentStep === 1 && (
        <MasterRegistrationStepOne 
          onNext={handleNext}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 2 && (
        <MasterRegistrationStepTwo 
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
      {currentStep === 3 && (
        <MasterRegistrationStepThree 
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

export default MasterModals