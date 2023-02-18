
import { sphereBufferGeometry } from "three"
 export function Totus(){
    return(
        <mesh position={[2,0,-49]}>
        <sphereBufferGeometry  args={[12,30, 20]}/>
        <meshStandardMaterial   emissive={[0.3,0.1,0.3]}/>
        </mesh>
    )
    }