# DO NOT CHANGE THIS FILE

with import <nixpkgs> { };
stdenv.mkDerivation {
  name = "env";
  nativeBuildInputs = [ pkg-config ];
  buildInputs = [
    libpng
		libjpeg
    libuuid
    /nix/store/p3a9gbsipl9ajfnxq27zpi1jq8azyq8x-python3-3.10.0rc1
  ];
	
  shellHook = ''
    LD=$CC

		nix-shell run.nix
  '';
}