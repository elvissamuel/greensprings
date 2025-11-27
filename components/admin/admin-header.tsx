"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/applications" className="flex items-center gap-3">
              <Image
                src="/GSL-Logo.png"
                alt="Greensprings School"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="hidden sm:block">
                <p className="font-bold text-maroon-900 text-sm">Greensprings School</p>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/admin/applications"
              className="text-sm font-medium text-gray-600 hover:text-maroon-800 transition-colors"
            >
              Applications
            </Link>
          </nav> */}

          <div className="flex items-center gap-4">
            {session?.user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-maroon-100 flex items-center justify-center">
                  <span className="text-maroon-700 font-semibold text-sm">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/admin/login" })}
                  className="text-sm text-gray-600 hover:text-maroon-800 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

