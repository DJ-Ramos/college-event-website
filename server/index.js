app.use(express.static(path.join(__dirname, '../client/build')))

app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})