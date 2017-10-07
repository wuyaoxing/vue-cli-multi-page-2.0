// formatDate 格式化时间 -> 'YYYY-MM-DD'
import format from 'date-fns/format'

export default (val, fmt = 'YYYY-MM-DD') => format(val, fmt)
