export default function myCatch(error) {
    (error) => {
        if (error.message == '重新登录') {
            view.$message.error('请重新登录')
        } else {
            view.$message.error('操作异常')
        }
    }
}