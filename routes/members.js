const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const members = require("../Members");

// Gets all members
router.get("/", (req, res) => {
  res.status(200).json({
    codeStatus: 200,
    data: members,
  });
});

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    return res.status(200).json({
      statusCode: 200,
      data: members.filter((member) => {
        return member.id === parseInt(req.params.id);
      }),
    });
  } else {
    return res.status(404).json({
      statusCode: 404,
      msg: `Member with the id: ${req.params.id} not found!`,
    });
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({
      statusCode: 400,
      msg: `Please include a name and a email`,
    });
  }

  members.push(newMember);
  res.status(201).json({
    statusCode: 201,
    data: members,
  });
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
      }

      return res.status(200).json({
        statusCode: 200,
        member,
      });
    });
  } else {
    return res.status(404).json({
      statusCode: 404,
      msg: `Member with the id: ${req.params.id} not found!`,
    });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const index = members.findIndex((course) => {
    return course.id === parseInt(id);
  });

  if (index >= 0) {
    const memberToDelete = members[index];
    members.splice(index, 1);
    return res.status(200).json({
      statusCode: 200,
      data: memberToDelete,
    });
  } else {
    res.status(404).json({
      statusCode: 404,
      msg: `Member with the id: ${req.params.id} not found!`,
    });
  }
});

module.exports = router;
