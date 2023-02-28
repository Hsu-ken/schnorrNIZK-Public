// main(SK) 
// proof(R,r,c,sk)
// PK()

// vertify(PK,R,z)
import { keccak_256 } from '@noble/hashes/sha3';
import * as secp from '@noble/secp256k1';


export function schnorrMain(skString) {

    skString = skString.toString();
    const sk = keccak_256(skString)


    const r = secp.utils.randomBytes(32)


    console.log("sk:")
    console.log(secp.utils.bytesToHex(sk));



    const schnorrNIZKProof = schnorrProof(r, sk); //{ z: z, c: cBig, R: R, PK: PK }

    console.log("R:")
    console.log(Buffer.from(schnorrNIZKProof.R).toString("hex").slice(2))

    console.log("z:")
    let hexValue = schnorrNIZKProof.z.toString(16);
    console.log(hexValue)



};
export function schnorrPK(skString) {

    skString = skString.toString();
    const sk = keccak_256(skString)
    console.log("sk: ")
    console.log(secp.utils.bytesToHex(sk));
    console.log("PK:")
    return (secp.utils.bytesToHex(secp.getPublicKey(sk)).slice(2))

};
export function schnorrProof(r, sk) {

    // c = hash(PK,R)
    // z = r + c*sk

    const R = secp.getPublicKey(r)
    const PK = secp.getPublicKey(sk);

    //確保被hash的是string
    //53c7ad67822d262abca805ceb474d2134bb2d61ea300ae77f754434e48dbe9ef572253080a8c4e2182276a8e687964a24c39b04c969e816697480048bbbedb88
    //e78768f49875eb903338d02bc2b20fc12a3f65f1863913d9e8afbd84c4f66c1671e2ad69fddba48794b2dc07ae8ced33eb54ad598c3c4dae5e65bc3a21fd61db

    //slice去掉 04壓縮的標記
    const RBuffer = Buffer.from(Buffer.from(R).toString("hex").slice(2))
    const PKBuffer = Buffer.from(Buffer.from(PK).toString("hex").slice(2))
    const c = keccak_256(Buffer.concat([RBuffer, PKBuffer]));


    const cBuffer = Buffer.from(c).toString("hex");
    // console.log("c(hex)")
    // console.log(cBuffer)


    const cBig = BigInt("0x" + cBuffer)
    const z = BigInt((BigInt("0x" + Buffer.from(r).toString('hex')) + BigInt("0x" + Buffer.from(sk).toString('hex')) * cBig) % secp.CURVE.n);


    return { z: z, c: cBig, R: R, PK: PK }; //{ z: bigint, c: bigint, R: uint8array, PK: uint8array }

};
export function schnorrVerify(schnorrNIZKProof) {
    // c = hash(PK,R)
    // z*G = R + c*PK

    // c = hash(PK,R)
    // const c = keccak_256(Buffer.concat([Buffer.from(schnorrNIZKProof.PK), Buffer.from(schnorrNIZKProof.R)]));
    // const cBuffer = Buffer.from(c).toString("hex");
    // const cBig = BigInt("0x" + cBuffer)

    // while (schnorrNIZKProof.z < BigInt("0")) {
    //     schnorrNIZKProof.z += secp256k1.CURVE.n
    // }

    // z*G = R + c*PK

    const zG = secp.Point.BASE.multiply(schnorrNIZKProof.z);
    // console.log("zG.toHex()")
    // console.log(zG.toHex())
    console.log("z:")
    console.log((schnorrNIZKProof.z).toString(16))

    const RAddcPK = secp.Point.fromHex(schnorrNIZKProof.R).add(secp.Point.fromHex(schnorrNIZKProof.PK).multiply(schnorrNIZKProof.c))

    // console.log("cPK")
    // console.log(secp.Point.fromHex(schnorrNIZKProof.PK).multiply(schnorrNIZKProof.c).toHex())
    // console.log("R+cPK")
    // console.log(RAddcPK.toHex())

    return zG.equals(RAddcPK);


}
export function schnorrSecp256test() {

    const sk = BigInt('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141')
    console.log(secp.getPublicKey(sk))

};