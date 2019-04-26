class Matrix {
    constructor(rows, cols, doRandomize = false) {
        this.rows = rows
        this.cols = cols

        this.data = [rows]

        for(let i =0; i < rows; i++) {
            this.data[i] = []
            for(let j =0; j < cols; j++)
                this.data[i].push(0)
        }
        if(doRandomize)
            this.randomize()
    }

    map(func) {
        return this.data = this.data.map((arr, i) => {
            return arr.map((value, j) => {
                return func(value, i, j)
            })
        })
    }   

    static map(A, func) {
        let matrix = new Matrix(A.rows, A.cols)
        
        matrix.data = A.data.map((arr, i) => {
            return arr.map((value, j) => {
                return func(value, i, j)
            })
        })

        return matrix
    }

    static convertMatrixToArray(obj) {
        let arr = []
        obj.map((elem, i, j) => {
            arr.push(elem)
        })
        return arr
    }

    randomize() {
        this.map((elem, i, j) => {
            return Math.random() *2 -1
            // return Math.floor(Math.random()*10)
        })
    }

    static convertArrayToMatrix(array) {
        let matrix = new Matrix(array.length, 1)
        
        array.map((value, i) => {          
            matrix.data[i][0] = value
        })
        return matrix
    }

    static transpose(A) {
        var matrix = new Matrix(A.cols, A.rows)
        matrix.map((num, i,j) => {
            return A.data[j][i]
        })
        return matrix
    }

    static escalar_multiply(A, escalar) {
        var matrix = new Matrix (A.rows, A.cols)
        matrix.map((value, i, j) => {
            return A.data[i][j] * escalar
        })
        return matrix        
    }

    static hadamard(A, B) {
        var matrix = new Matrix (A.rows, A.cols)
        matrix.map((value, i, j) => {
            return A.data[i][j] * B.data[i][j]
        })
        return matrix        
    }

    static subtract(A, B) {
        var matrix = new Matrix (A.rows, A.cols)
        matrix.map((value, i, j) => {
            return A.data[i][j] - B.data[i][j]
        })
        return matrix        
    }

    static add(A, B) {
        var matrix = new Matrix (A.rows, A.cols)
        matrix.map((value, i, j) => {
            return A.data[i][j] + B.data[i][j]
        })
        return matrix        
    }

    static multiply(A, B) {
        var matrix = new Matrix (A.rows, B.cols)
        
        matrix.map((value, i, j) => {
            let aux = 0
            for(let row = 0; row < B.rows; row++) {
                aux += A.data[i][row] * B.data[row][j]
            }
            return aux
        })
        
        return matrix   
    }
    print() {
        console.table(this.data)
    }
}
