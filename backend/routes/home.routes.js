router.delete("/:id", async (req, res) => {
  console.log("Delete Users");
  try {
    const result = await User.findByIdAndDelete(req?.params?.id);
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});
