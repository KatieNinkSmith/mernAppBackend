import Brain from "../models/brain.mjs";

async function seed(req, res) {
  const TODAY = new Date();

  try {
    await Brain.create([
      {
        entryDate: TODAY,
        entryType: "ToDo",
        description: "add meeting to calendar",
      },
      {
        entryDate: TODAY,
        entryType: "Sched",
        description: "read required chapter",
      },
      {
        entryDate: TODAY,
        entryType: "Idea",
        description: "i do not have ideas right now",
      },
      {
        entryDate: TODAY,
        entryType: "List",
        description: "more books to read",
      },
    ]);
    res.send("success").status(200);
  } catch (err) {
    res.send(err).status(400);
  }
}

const getEntries = async (req, res) => {
  try {
    const foundEntries = await Brain.find({});
    res.status(200).json(foundEntries);
  } catch (err) {
    res.send(err).status(400);
  }
};

const addEntry = async (req, res) => {
  console.log("body: ", req.body);
  try {
    const createdEntry = await Brain.create(req.body);
    console.log("created", createdEntry);
    res.status(200).json(createdEntry);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteEntry = async (req, res) => {
  console.log("deleting... ");
  try {
    const deletedEntry = await Brain.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).send("Entry not found");
    }
    res.status(200).json(deletedEntry);
  } catch (err) {
    res.send(err).status(400);
  }
};

const updateEntry = async (req, res) => {
  console.log("Editing... ");
  try {
    const updatedEntry = await Brain.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEntryEntry) {
      return res.status(404).send("Entry not found");
    }
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { seed, getEntries, addEntry, deleteEntry, updateEntry };
