const {createApp} = require('@financial/api/lib')

 async function main() {
    const app = await createApp()

    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })

}

main()