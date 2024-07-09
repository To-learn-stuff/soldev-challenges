import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { StudentBio3 } from "../target/types/student_bio_3";
import { expect } from "chai"

describe("student-bio-3", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.StudentBio3 as Program<StudentBio3>;

  const student = {
    name: "John Doe",
    message: "Hello World"
  }

  const [studentPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(student.name), provider.wallet.publicKey.toBuffer()],
    program.programId
  )

  it("student intro created`", async () => {
    const tx = await program.methods
      .createIntro(student.name, student.message)
      .rpc()

    const account = await program.account.studentAccountState.fetch(studentPda)
    expect(student.name === account.name)
    expect(student.message === account.message)
    expect(account.student === provider.wallet.publicKey)
  })



  it("student intro is updated`", async () => {
    const newDescription = "Wow this is new"

    const tx = await program.methods
      .updateIntro(student.name, newDescription)
      .rpc()

    const account = await program.account.studentAccountState.fetch(studentPda)
    expect(student.name === account.name)
    expect(newDescription === account.message)
    expect(account.student === provider.wallet.publicKey)
  })

  it("Deletes a movie review", async () => {
    const tx = await program.methods
    .deleteIntro(student.name)
    .rpc()
  })

});
