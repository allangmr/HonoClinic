import clsx from "clsx"

interface StatCardProps {
  type: 'appointments' | 'pending' | 'cancelled'
  count: number
  label: string
  icon: string
}
const StatCard = ({count = 0, label, icon, type}: StatCardProps) => {
  return (
    <div className={clsx('stat-card', {
      'bg-appointments': type === 'appointments',
      'bg-pending': type === 'pending',
      'bg-cancelled': type === 'cancelled'
    })}>
      text
    </div>
  )
}

export default StatCard