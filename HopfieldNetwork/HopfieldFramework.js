//METHODS:
//GenerateConfigRowVector
//InitMatrix
//NormalizeMatrix
//SetMatrixDiagonalToZero
//AddMatrix
//MultiplyMatrix
//GenerateMatrix
//MultiplyRowVectorByMatrix
//MultiplyMatrixByColumnVector
//GetProductScalar
//GetEnergy
//GetRandom
//GetRandomInt
//CloneVector

function GenerateConfigRowVector(configurationMatrix){
  configRowVector = [];

  rowQuantity = configurationMatrix.length;
  columnQuantity = configurationMatrix[0].length;

  for(i = 0; i < rowQuantity; i++){
    for(j = 0; j < columnQuantity; j++){
      idx = (i*columnQuantity) + j;
      configRowVector[idx] = configurationMatrix[i][j];
    }
  }

  return configRowVector;
}

function InitMatrix(rowQuantity, columnQuantity){
  m = [,];

  for(i = 0; i < rowQuantity; i++){
    m[i] = [];
    for(j = 0; j < columnQuantity; j++){
      m[i][j] = 0;
    }
  }

  return m;
}

function NormalizeMatrix(M)
{
  rowQuantity = M.length;
  columnQuantity = M[0].length;

  for(i = 0; i < rowQuantity; i++){
    for(j = 0; j < columnQuantity; j++){
      if(M[i][j] > 1){
        M[i][j] = 1;
      }
      else if(M[i][j] < -1){
        M[i][j] = -1;
      }
    }
  }

  return M;
}

function SetMatrixDiagonalToZero(M)
{
  rowQuantity = M.length;
  columnQuantity = M[0].length;

  for(k = 0; k < rowQuantity; k++){
    M[k][k] = 0;
  }

  return M;
}


function AddMatrix(A,B){
  C = [,];

  rowQuantity = A.length;
  columnQuantity = A[0].length;

  for(rowIdx = 0; rowIdx < rowQuantity; rowIdx++){
    C[rowIdx] = [];
    for(columnIdx = 0; columnIdx < columnQuantity; columnIdx++){
      C[rowIdx][columnIdx] = A[rowIdx][columnIdx] + B[rowIdx][columnIdx];
    }
  }

  return C;
}

//Matrix multiplication: A & B are matrix
function MultiplyMatrix(A, B){
  C = [,];

  for(rowIdx = 0; rowIdx <2; rowIdx++){
    C[rowIdx] = [];

    for(columnIdx = 0; columnIdx < 2; columnIdx++){
      C[rowIdx][columnIdx] = 0;

      for(k = 0; k< 3; k++){
        C[rowIdx][columnIdx] = C[rowIdx][columnIdx] + (A[rowIdx][k] * B[k][columnIdx]);
      }
    }
   }

  return C;
}

function GenerateMatrix(columnVector, rowVector){
  matrix = [,];

  for(columnVectorIdx = 0; columnVectorIdx < columnVector.length; columnVectorIdx++){

    matrix[columnVectorIdx] = [];

    for(rowVectorIdx = 0; rowVectorIdx < rowVector.length; rowVectorIdx++){
      matrix[columnVectorIdx][rowVectorIdx] = columnVector[columnVectorIdx] * rowVector[rowVectorIdx];
    }
  }

  return matrix;
}

function MultiplyRowVectorByMatrix(rowVector, matrix){
  result = [];

  columnQuantity = matrix[0].length;

  for(columnIdx = 0; columnIdx < columnQuantity; columnIdx++){
    result[columnIdx] = 0;

    for(rowVectorIdx = 0; rowVectorIdx < rowVector.length; rowVectorIdx++){
      result[columnIdx] = result[columnIdx] + (rowVector[rowVectorIdx] * matrix[rowVectorIdx][columnIdx]);
    }
  }

  return result;
}

function MultiplyMatrixByColumnVector(matrix, columnVector){
  if(matrix == null){
    throw new NullException("The matrix is null");
  }

  if(columnVector == null){
    throw new NullException("The column vector is null");
  }



  result = [];

  rowQuantity = matrix.length;

  for(rowIdx = 0; rowIdx < rowQuantity; rowIdx++){
    result[rowIdx] = 0;

    for(columnIdx = 0; columnIdx < columnVector.length; columnIdx++){
      result[rowIdx] = result[rowIdx] + (matrix[rowIdx][columnIdx] * columnVector[columnIdx]);
    }

  }

  return result;
}

function GetProductScalar(rowVector, columnVector){
  if(rowVector.length != columnVector.length){
    throw new DimensionException("The two vectors have not the same length");
  }

  result = 0;
  try
  {
    for(i = 0; i < rowVector.length; i++){
      result = result + (rowVector[i]*columnVector[i]);
    }
  }
  catch(e){
    throw new Exception("Wrong data in the vector");
  }

  return result;
}

function GetEnergy(Weight, Configuration){
  tmp =  MultiplyRowVectorByMatrix(Configuration,Weight);

  Energy = -GetProductScalar(tmp, Configuration);

  return Energy;
}

function GetRandom(max){
  return GetRandomInt(0, max);
}

function GetRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function CloneVector(v){
  cloneV = [];

  for(i = 0; i < v.length; i++){
    cloneV[i] = v[i];
  }

  return cloneV;
}



//Exception
function DimensionException(message){
  this.Message =  message;
  this.Name = 'DimensionException';
}

function Exception(message){
  this.Message = message;
  this.Name = 'GenericException';
}

function NullException(message){
  this.Message = message;
  this.Name = 'NullException';
}
