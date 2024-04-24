import prisma from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();
  const type = data.type;
  const userData = data.data;
    console.log(type, userData);
  if (type === "user.created") {
    let fullName = userData.first_name + " " + userData.last_name;
    let userObj = {
      name: fullName,
      externalId: userData.id,
      isActive: true,
    };

    const user = await prisma.user.create({
      data: userObj,
    });
  }
  
  return Response.json("OK");
}
