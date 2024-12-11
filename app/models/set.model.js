module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      _id: {
        type: String,
      },
      topic: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      author_id: {
        type: String,
      },
      cards: [
        {
          _id: {
            type: String,
          },
          term: {
            type: String,
            required: true,
            trim: true
          },
          definition: {
            type: String,
            required: true,
            trim: true
          }
        }
      ],
      created: {
        type: Date,
        default: Date.now
      },
      updated: {
        type: Date,
        default: Date.now
      }
    });
  // Sebelum mengupdate dokumen, perbarui `updated` timestamp
  schema.pre('save', function (next) {
    this.updated = Date.now();
    next();
  });

  const Sets = mongoose.model("Sets", schema);
  return Sets
}