export default function toast(view) {
    let r = {
        message(msg) {
            view.$message({
                offset: 80,
                message: msg,
                type: "success"
            });
        },
        error(msg) {
            view.$message({
                offset: 80,
                message: msg,
                type: "error"
            })
        }
    }
    return r;
}