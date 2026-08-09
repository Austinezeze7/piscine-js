// block-chain.js

// Note: hashCode is provided by the test environment
// Do not redefine it here

function blockChain(data, prev) {
  // If no prev is provided, use genesis block
  if (prev === undefined) {
    prev = { index: 0, hash: '0' };
  }
  
  // Calculate the new block's index
  const index = prev.index + 1;
  
  // Create the hash input string: index + prev.hash + JSON.stringify(data)
  const hashInput = index + prev.hash + JSON.stringify(data);
  
  // Calculate the hash using the provided hashCode function
  const hash = hashCode(hashInput);
  
  // Create and return the block object
  const block = {
    index: index,
    hash: hash,
    data: data,
    prev: prev,
    chain: function(newData) {
      // Create a new block with this block as the previous
      return blockChain(newData, this);
    }
  };
  
  return block;
}