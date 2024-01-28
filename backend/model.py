import torch
import numpy as np
device = 'cuda' if torch.cuda.is_available() else 'cpu'

DIM = 512
import math
import torch.nn as nn
class PositionalEncoding(nn.Module):

    def __init__(self, d_model: int, dropout: float = 0.1, max_len: int = 5000):
        super().__init__()
        self.dropout = nn.Dropout(p=dropout)

        position = torch.arange(max_len).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model))
        pe = torch.zeros(max_len, 1, d_model)
        pe[:, 0, 0::2] = torch.sin(position * div_term)
        pe[:, 0, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)

    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        x = x + self.pe[:x.size(0)].to(device)
        return x
#https://pytorch.org/tutorials/beginner/transformer_tutorial.html

class Music(torch.nn.Module):
  def __init__(self):
    super().__init__()
    self.pos = PositionalEncoding(DIM, max_len=201)#torch.nn.Embedding(200, DIM).to(device)
    self.projection = torch.nn.Embedding(128, DIM).to(device)
    self.trans = torch.nn.TransformerEncoder(torch.nn.TransformerEncoderLayer(DIM, 16, batch_first=True), 8).to(device)
    self.output = torch.nn.Linear(DIM, 128).to(device)
  def forward(self, x):
    #pos = self.pos(torch.arange(0,200).to(device))
    feature = self.projection(x)
    feature = self.pos(feature)
    feature = self.trans(feature, mask=torch.nn.Transformer.generate_square_subsequent_mask(200), is_causal=True)
    return self.output(feature)
model = Music()