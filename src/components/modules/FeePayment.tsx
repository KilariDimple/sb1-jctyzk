import React, { useState, useEffect } from 'react';

interface FeePaymentProps {
  userType: 'student' | 'mentor' | 'parent' | null;
}

const FeePayment: React.FC<FeePaymentProps> = ({ userType }) => {
  const [feeDetails, setFeeDetails] = useState({
    tuitionFee: 5000,
    libraryFee: 500,
    laboratoryFee: 1000,
    totalFee: 6500,
    paidAmount: 3000,
    dueAmount: 3500,
  });

  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    // This effect will run when the component mounts and whenever feeDetails changes
    const storedFeeDetails = localStorage.getItem('feeDetails');
    if (storedFeeDetails) {
      setFeeDetails(JSON.parse(storedFeeDetails));
    }
  }, []);

  useEffect(() => {
    // This effect will run whenever feeDetails changes
    localStorage.setItem('feeDetails', JSON.stringify(feeDetails));
  }, [feeDetails]);

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount > feeDetails.dueAmount) {
      alert('Payment amount cannot exceed the due amount');
      return;
    }

    setFeeDetails((prev) => ({
      ...prev,
      paidAmount: prev.paidAmount + amount,
      dueAmount: prev.dueAmount - amount,
    }));
    setPaymentAmount('');

    // Generate receipt
    const receipt = `
      Receipt for Fee Payment
      -----------------------
      Date: ${new Date().toLocaleDateString()}
      Amount Paid: $${amount}
      Remaining Balance: $${feeDetails.dueAmount - amount}
      -----------------------
      Thank you for your payment!
    `;

    alert('Payment successful! Receipt:\n\n' + receipt);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Fee Payment</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Fee Details</h3>
          <p>Tuition Fee: ${feeDetails.tuitionFee}</p>
          <p>Library Fee: ${feeDetails.libraryFee}</p>
          <p>Laboratory Fee: ${feeDetails.laboratoryFee}</p>
          <p className="font-bold mt-2">Total Fee: ${feeDetails.totalFee}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Status</h3>
          <p>Paid Amount: ${feeDetails.paidAmount}</p>
          <p className="font-bold text-red-600">Due Amount: ${feeDetails.dueAmount}</p>
        </div>
      </div>
      {(userType === 'student' || userType === 'parent') && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Make a Payment</h3>
          <div className="flex items-center">
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              className="mr-2 p-2 border rounded"
            />
            <button
              onClick={handlePayment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
      {userType === 'mentor' && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generate Fee Bill</h3>
          <button
            onClick={() => alert('Fee bill generated and sent to the student.')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Generate and Send Bill
          </button>
        </div>
      )}
    </div>
  );
};

export default FeePayment;