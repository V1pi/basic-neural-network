function sigmoid (x) {
    return 1/(1 + Math.exp(-x))
}

function dsigmoid(x) {
    return x * (1- x)
}
class NeuralNetwork {
    // 2 - 3 - 4
    constructor (i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes
        this.h_nodes = h_nodes
        this.o_nodes = o_nodes

        this.bias_ih = new Matrix(h_nodes, 1, true) // h_nodes X 1 // 3X1
        this.bias_ho = new Matrix(o_nodes, 1, true) // o_nodes x 1 // 4X1
        
        this.weight_ih = new Matrix(h_nodes, i_nodes, true) // h_nodes X i_nodes // 3x2
        this.weight_ho = new Matrix(o_nodes, h_nodes, true) // o_nodes X h_nodes //4x3     

        this.learning_rate = 0.1
    }

    // input = [1,2]
    train(input, target) {
        let input_m = Matrix.convertArrayToMatrix(input) // input X 1 // 2x1
        let expected = Matrix.convertArrayToMatrix(target)

        // INPUT -> HIDDEN
        let hidden = Matrix.multiply(this.weight_ih, input_m) // h_nodes X 1 // 3 X 1
        hidden = Matrix.add(hidden, this.bias_ih)
        hidden.map(sigmoid)

        // HIDDEN -> OUTPUT

        let output = Matrix.multiply(this.weight_ho, hidden) // o_nodes X 1 // 4 X 1
        output = Matrix.add(output, this.bias_ho)
        output.map(sigmoid)

        //BACKPROPAGATION

        // OUTPUT -> INPUT
        let output_error = Matrix.subtract(expected, output) // o_nodes X 1 // 4 X 1  
        let d_output = Matrix.map(output, dsigmoid) // o_nodes X 1 // 4 X 1
        let hidden_t = Matrix.transpose(hidden) // 1 X h_nodes // 1 X 3
        
        let gradient = Matrix.hadamard(d_output, output_error) // o_nodes X 1 // 4 X 1  
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate)

        this.bias_ho = Matrix.add(this.bias_ho, gradient)

        let weight_ho_deltas = Matrix.multiply(gradient, hidden_t) // o_nodes X h_nodes // 4 X 3 
        this.weight_ho = Matrix.add(this.weight_ho, weight_ho_deltas) 

        // HIDDEN -> INPUT
        let weight_ho_T = Matrix.transpose(this.weight_ho) // h_nodes X o_nodes // 3 X 4
        let hidden_error = Matrix.multiply(weight_ho_T, output_error) // h_nodes X 1 // 3 X 1
        let d_hidden = Matrix.map(hidden, dsigmoid) // h_nodes X 1 // 3 X 1
        let input_T = Matrix.transpose(input_m) // 1 X input // 1 X 2

        let gradient_H = Matrix.hadamard(hidden_error, d_hidden) // h_nodes X 1 // 3 X 1
        gradient_H = Matrix.escalar_multiply(gradient_H, this.learning_rate)

        this.bias_ih = Matrix.add(this.bias_ih, gradient_H)

        let weight_ih_deltas = Matrix.multiply(gradient_H, input_T) // h_nodes X input // 3 X 2
        this.weight_ih = Matrix.add(this.weight_ih, weight_ih_deltas)

    }

    predict(input) {
        let input_m = Matrix.convertArrayToMatrix(input) // input X 1 // 2x1

        // INPUT -> HIDDEN
        let hidden = Matrix.multiply(this.weight_ih, input_m) // h_nodes X 1 // 3 X 1
        hidden = Matrix.add(hidden, this.bias_ih)
        hidden.map(sigmoid)

        // HIDDEN -> OUTPUT

        let output = Matrix.multiply(this.weight_ho, hidden) // o_nodes X 1 // 4 X 1
        output = Matrix.add(output, this.bias_ho)
        output.map(sigmoid)
        output = Matrix.convertMatrixToArray(output)
        return output
    }
}