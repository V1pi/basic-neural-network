class NeuralNetworkRecursive {
    // @param h_array = [numero de camadas, quantidade de neuronios]
    constructor (i_nodes, h_array, o_nodes) {
        this.i_nodes = i_nodes
        this.h_array = h_array
        this.o_nodes = o_nodes
        
        // Deixo a posição zero vazia para facilitar em modularidade
        this.bias = []
        this.weights = []
        for(let i = 0; i < h_array[0]; i++) {
            this.bias.push(new Matrix(h_array[1], 1, true))
            this.weights.push(new Matrix(h_array[1], 1, true))
        }

        this.bias.push(new Matrix(o_nodes, 1, true)) // o_nodes x 1 // 4X1
        
        this.weight_ih = new Matrix(h_nodes, i_nodes, true) // h_nodes X i_nodes // 3x2
        this.weight_ho = new Matrix(o_nodes, h_nodes, true) // o_nodes X h_nodes //4x3     

        this.learning_rate = 0.1
    }

    feedForward(n) {
        if(n==1)
            return
        this.layers[n-1] = Matrix.multiply(this.weights[n-1], this.layers[n-2]) // o_nodes X 1 // 4 X 1
        this.layers[n-1] = Matrix.add(matrix, this.bias[n-1])
        this.layers[n-1].map(sigmoid)

        return this.feedForward(n-1)
    }

    backpropagation(n, lastError = undefined, expected = undefined) {
        if(n==1)
            return

        let error = 0
        let currentLayer = this.layers[n-1]
        let nextLayer = this.layers[n-2]

        if(layers.length == n && expected != undefined) {
            error = Matrix.subtract(expected, currentLayer)
        } else {
            let weight_T = Matrix.transpose(this.weights[n])
            error = Matrix.multiply(weight_T, lastError)
        }
        let d_matrix = Matrix.map(currentLayer, dsigmoid)
        let next_T = Matrix.transpose(nextLayer)

        let gradient = Matrix.hadamard(d_matrix, error)
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate)

        this.bias[n-1] = Matrix.add(this.bias[n-1], gradient)

        let weight_delta = Matrix.multiply(gradient, next_T)
        this.weights[n-1] = Matrix.add(this.weights[n-1], weight_delta)

        return this.backpropagation(n-1, error)
    }

    train(input, target) {
        input = Matrix.convertArrayToMatrix(input) // input X 1 // 2x1
        let expected = Matrix.convertArrayToMatrix(target)
        this.feedForward(this.layers.length)
        this.backpropagation(this.layers.length, null, expected)
    }


}