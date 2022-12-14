import Image from 'next/image';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                  <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                      <button>
                        <span className="sr-only">Your Company</span>
                        <Image alt="Your Company" className="h-8 w-auto sm:h-10" src="/images/icons/logo_yard_sale.svg" width="100%" height="100%" layout="responsive" />
                      </button>
                    </div>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel focus className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
                  <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <div>
                        <Image className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Admin Dashboard</span>
                </h1>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                  <span className="block text-lime-600 xl:inline">Yard Sale Store</span>
                </h3>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Through this dashboard, you will be able to communicate with the database of products. You can check the product details, create, edit, and delete as required. You can do so by
                  connecting with the&nbsp;
                  <a
                    className="text-indigo-600 underline hover:text-purple-700 transition duration-300 ease-in-out mb-4"
                    href="https://api.escuelajs.co/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Platzi Fake Store API.
                  </a>
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/login">
                      <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg">
                        Log in
                      </button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg">
                      Back to the store
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" src="/images/welcome-image.jpg" alt="" width="100%" height="100%" layout="responsive" />
        </div>
      </div>
    </>
  );
}
