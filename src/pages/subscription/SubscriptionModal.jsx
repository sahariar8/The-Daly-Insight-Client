import { Dialog, Transition } from '@headlessui/react'
import { Elements } from '@stripe/react-stripe-js'
import { format } from 'date-fns'
import { Fragment } from 'react'
import CheckoutForm from './CheckOutForm'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
const SubscriptionModal = ({ closeModal, isOpen ,subscriptionInfo}) => {
  const price = localStorage.getItem('price');
  console.log(price);
    return (
       <div>

        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
  
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium text-center leading-6 text-gray-900'
                  >
                    Review Info Before Subscription
                  </Dialog.Title>
                   <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Name: {subscriptionInfo.name}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                     Email: {subscriptionInfo.email}
                    </p>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                     User Id: {subscriptionInfo.userId}
                    </p>
                  </div>
                  {/* <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      From: {format(new Date(bookingInfo.from), 'PP')} - To:{' '}
                      {format(new Date(bookingInfo.to), 'PP')}
                    </p>
                  </div> */}
  
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Price: $ {price}
                    </p>
                  </div> 
                  <hr className='mt-8 ' />
                  {/* Card data form */}
                  <Elements  stripe={stripePromise}>
                      <CheckoutForm closeModal={closeModal} subscriptionInfo={subscriptionInfo}/>
                  </Elements>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>
    )
  }


export default SubscriptionModal;