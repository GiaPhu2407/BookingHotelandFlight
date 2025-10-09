import type React from "react"
import { Plane, Hotel } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-1.5">
                <Plane className="h-7 w-7 text-primary" />
                <Hotel className="h-6 w-6 text-accent" />
              </div>
              <span className="text-2xl font-bold text-foreground">TravelHub</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">{title}</h1>
            <p className="text-muted-foreground text-pretty">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90" />
        <img
          src="/modern-airport-terminal-with-planes-and-travelers.jpg"
          alt="Travel background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <div className="space-y-4 max-w-lg">
            <h2 className="text-4xl font-bold text-balance">Khám phá thế giới cùng chúng tôi</h2>
            <p className="text-lg text-white/90 text-pretty leading-relaxed">
              Đặt vé máy bay và khách sạn dễ dàng, nhanh chóng với giá tốt nhất. Hơn 10,000 khách hàng tin tưởng mỗi
              ngày.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-white/80">Hãng hàng không</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-white/80">Khách sạn</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-sm text-white/80">Đặt chỗ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
